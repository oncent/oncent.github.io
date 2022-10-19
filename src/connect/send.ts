import { createCancelablePromise } from "@/utils/cancelablePromise";
import type { DataConnection } from "peerjs";

type ReceivingCallback<RM = any> = (finished: () => Promise<RM>) => void;

enum SendType {
  Data,

  SendWasAbort,
  DataWasReceived,
  Metadata,
}
type SendData = {
  type: SendType;
  data: any;
  id: number;
};

const getId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
})();

const DATA_WAS_RECEIVED = "DATA_SENDED";
const SEND_WAS_ABORTED = "DATA_ABORTED";
const NEXT_DATA_RECEIVED = "DATA_NEXT_RECEIVED";

export class Sender<M = any> extends EventTarget {
  constructor(
    private connection: DataConnection,
    public info: {
      receiver: M & { connectId: string };
      sender: M & { connectId: string };
    }
  ) {
    super();
    this.connection.on("data", (_data) => {
      console.log("all data received", _data);
      const data = _data as SendData;
      switch (data.type) {
        case SendType.Data:
          this.connection.send({
            type: SendType.DataWasReceived,
            data: data.id,
          });
          this.dispatchEvent(
            new CustomEvent(NEXT_DATA_RECEIVED, { detail: _data })
          );
          this.receivingCallback?.(() => data.data);
          break;
        case SendType.DataWasReceived:
          this.dispatchEvent(
            new CustomEvent(DATA_WAS_RECEIVED, { detail: _data })
          );
          break;
        case SendType.SendWasAbort:
          this.dispatchEvent(
            new CustomEvent(SEND_WAS_ABORTED, { detail: _data })
          );
          break;
        default:
          break;
      }
    });
  }
  send(data: any) {
    return createCancelablePromise((onCancel) => {
      return new Promise<void>((res, rej) => {
        console.log("send action", data);
        const messageId = getId();
        this.connection.send({
          type: SendType.Data,
          data,
          id: messageId,
        });
        let isCanceled = false;
        onCancel(() => {
          this.connection.send({
            type: SendType.SendWasAbort,
            data: messageId,
          });
          isCanceled = true;
        });
        const rcfn = (rcdata: any) => {
          console.log("send received", rcdata);
          if (isCanceled) {
            rej();
            return;
          }
          if (
            (rcdata as SendData).type === SendType.DataWasReceived &&
            (rcdata as SendData).data === messageId
          ) {
            res();
            this.connection.off("data", rcfn);
          }
          if (
            (rcdata as SendData).type === SendType.SendWasAbort &&
            (rcdata as SendData).data === messageId
          ) {
            rej();
            this.connection.off("data", rcfn);
          }
        };
        this.connection.on("data", rcfn);

        const erfn = () => {
          rej();
          this.connection.off("error", erfn);
        };
        this.connection.on("error", erfn);
      });
    });
  }
  close() {
    this.connection.close();
  }
  reject() {
    this.connection.send({ type: SendType.SendWasAbort });
    this.connection.close();
  }

  private receivingCallback?: ReceivingCallback;
  onReceiving(callback: ReceivingCallback) {
    this.receivingCallback = callback;
  }

  nextReceived<T = unknown>() {
    return new Promise<T>((res, rej) => {
      const fn = (data: any) => {
        console.log("next recieved", data);
        if (data.type === SendType.Data) {
          res(data.data);
          this.connection.off("data", fn);
        }
        if (data.type === SendType.SendWasAbort) {
          rej();
          this.connection.off("data", fn);
        }
      };
      this.connection.on("data", fn);
    });
  }
}
