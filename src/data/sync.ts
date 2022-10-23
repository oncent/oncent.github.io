import { showMessage, MessageType } from "@/components/common/message";
import type { Sender } from "@/connect";
import { useUser } from "@/hooks/useUser";
import { t } from "@/locale";
import {
  createCancelablePromise,
  isCancelError,
} from "@/utils/cancelablePromise";
import dayjs from "dayjs";
import type { Bill } from "./bill";
import { db } from "./db";

export type ParticipantsMeta = {
  userId: string;
  name: string;
};

const { addUserInfo, allUsers, updateUserInfo } = useUser();

export const handleSync = (
  sender: Sender<ParticipantsMeta>,
  isReceiver = false
) => {
  return createCancelablePromise(async (onCancel) => {
    try {
      const { receiver } = sender.info;
      const selfData = await db.bills.toArray();
      const { start, cancel } = sender.send(selfData);
      onCancel(cancel);
      const data = await (async () => {
        if (isReceiver) {
          const data = await sender.nextReceived<Bill[]>();
          await start();
          return data;
        } else {
          const [_, data] = await Promise.all([
            start(),
            sender.nextReceived<Bill[]>(),
          ]);
          return data;
        }
      })();

      const friendInfo = allUsers.value.find(
        (u) => u.connectId === receiver.connectId
      );
      if (friendInfo) {
        await updateUserInfo(friendInfo.id, {
          name: receiver.name,
          latestTransferTime: dayjs().unix(),
          connectId: receiver.connectId,
        });
      } else
        await addUserInfo({
          id: receiver.userId,
          name: receiver.name,
          latestTransferTime: dayjs().unix(),
          connectId: receiver.connectId,
        });
      await db.addNewBillTable(receiver.userId, data);
      // cancel()
      await new Promise<void>((res) =>
        setTimeout(() => {
          res();
        }, 500)
      );
      sender.close();
      showMessage({ type: MessageType.Success, content: t("sync-success") });
    } catch (error) {
      if (!isCancelError(error)) {
        showMessage({
          type: MessageType.Error,
          content: t("something-wrong-please-try-again"),
        });
      }
    }
  });
};
