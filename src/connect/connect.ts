import { createCancelablePromise } from "@/utils/cancelablePromise";
import Peer, { type DataConnection } from "peerjs";
import { Sender } from "./send";

export type Participants<M = any> = {
  connectId: string;
  latestTransferTime: number;
  meta: M;
};

export type ConnectorStore = {
  peerId: string;
};

type MetaInfo = {
  name: string;
};
type ConnectionCallback = (
  info: MetaInfo,
  accept: () => Promise<Sender>,
  reject: () => void
) => void;

const DATA_CONNECTION_REQUEST = "CONNECTION_REQUEST";
const DATA_CONNECTION_ACCEPTED = "CONNECTION_ACCEPTED";

const ERROR_CONNECTION_REJECT = "CONNECTION_REJECT_ERROR";
const ERROR_CONNECTION_CANCELED = "ERROR_CONNECTION_CANCELED";

const EVENT_USER_ACCEPT = "EVENT_USER_ACCEPT";
const EVENT_USER_REJECT = "EVENT_USER_REJECT";
const EVENT_SENDER_CANCEL = "EVENT_SENDER_CANCEL";

export const isConnectionRejected = (error: Error | any) =>
  error?.message === ERROR_CONNECTION_REJECT;

export const isConnectionCanceled = (error: Error | any) =>
  error?.message === ERROR_CONNECTION_CANCELED;

export class Connector<M = any> extends EventTarget {
  peer: Peer;
  constructor(private meta: M, peerId?: string) {
    super();
    this.peer = peerId ? new Peer(peerId) : new Peer();
    this.setPeer();
  }
  private notifyUpdate() {
    this.dispatchEvent(new CustomEvent("update", { detail: this.save() }));
  }
  static fromStore<T>(meta: T, store?: ConnectorStore) {
    if (!store) return new Connector<T>(meta);
    const connector = new Connector<T>(meta, store.peerId);
    return connector;
  }

  save(): ConnectorStore {
    return {
      peerId: this.peer.id,
    };
  }

  connect(connectId: string) {
    return createCancelablePromise((onCancel) => {
      let sender: Sender | undefined;
      let conn: DataConnection | undefined;
      onCancel(() => {
        sender?.close();
        conn?.close();
      });
      const pro = new Promise<Sender>((res, rej) => {
        conn = this.peer.connect(connectId, {
          metadata: { ...this.meta, connectId: this.peer.id },
        });
        conn.once("open", () => {
          conn!.send(DATA_CONNECTION_REQUEST);
          const fn = (data: any) => {
            if (data.type === DATA_CONNECTION_ACCEPTED) {
              sender = new Sender<M>(conn!, {
                sender: { ...this.meta, connectId: this.peer.id },
                receiver: { ...data.metadata, connectId },
              });
              res(sender);
            }
            if (data.type === ERROR_CONNECTION_REJECT) {
              rej();
            }
          };
          conn!.once("data", fn);
        });
        conn.once("close", () => rej(new Error(ERROR_CONNECTION_REJECT)));
        conn.once("error", rej);
      });

      return pro;
    });
  }
  disconnect(connectId: string) {
    this.peer.getConnection(this.peer.id, connectId)?.close();
  }

  private connectionCallback?: ConnectionCallback;
  onConnection(callback: ConnectionCallback) {
    this.connectionCallback = callback;
  }

  private setPeer() {
    this.peer.on("open", () => {
      this.notifyUpdate();
      this.dispatchEvent(new CustomEvent("ready"));

      const toBeAccepted = () =>
        new Promise<void>((res, rej) => {
          this.addEventListener(
            EVENT_USER_ACCEPT,
            () => {
              res();
            },
            { once: true }
          );
          this.addEventListener(
            EVENT_USER_REJECT,
            () => {
              rej();
            },
            { once: true }
          );
          this.addEventListener(
            EVENT_SENDER_CANCEL,
            () => {
              rej();
            },
            { once: true }
          );
        });

      let sender: Sender | undefined;
      this.peer.on("connection", async (conn) => {
        let isClosed = false;
        conn.once("close", () => {
          isClosed = true;
        });
        const isAccepted = toBeAccepted();
        conn.once("data", async (data: any) => {
          if (data === DATA_CONNECTION_REQUEST) {
            try {
              await isAccepted;
              if (!isClosed) {
                sender = new Sender<M>(conn, {
                  sender: { ...this.meta, connectId: this.peer.id },
                  receiver: { ...conn.metadata },
                });
              }
            } catch (error) {
              conn.send({ type: ERROR_CONNECTION_REJECT });
              conn.close();
            }
          }
        });
        const accept = async () => {
          this.dispatchEvent(new CustomEvent(EVENT_USER_ACCEPT));
          await isAccepted;
          if (isClosed) {
            isClosed = false;
            throw new Error(ERROR_CONNECTION_CANCELED);
          }
          conn.send({
            type: DATA_CONNECTION_ACCEPTED,
            metadata: { ...this.meta, connectId: this.peer.id },
          });
          return sender as Sender;
        };
        const reject = () => {
          this.dispatchEvent(new CustomEvent(EVENT_USER_REJECT));
          isClosed = false;
        };
        this.connectionCallback?.(conn.metadata as MetaInfo, accept, reject);
      });
    });
  }

  destroy() {
    this.peer.destroy();
  }
}
