<template>
  <div class="flex flex-col divide-y">
    <div class="flex flex-col items-center py-2 pb-4">
      <div class="py-2">Your code:</div>
      <div class="flex justify-center">
        <div class="allow-select px-2 bg-stone-200 rounded flex items-center">
          {{ userInfo.connectId }}
        </div>
        <button
          class="buttoned rounded mx-2 px-4 py-2"
          @click="copy(userInfo.connectId)"
        >
          <i class="icon-copy"></i>
        </button>
      </div>
    </div>
    <div class="pb-4">
      <div class="pt-2">Shared users</div>
      <div v-for="participant in participants" :key="participant.connectId">
        <SyncUser
          :name="participant.meta.name"
          :latest-update="participant.latestTransferTime"
          :auto-sync="false"
          @sync="syncToFriends(participant.connectId)"
          @delete="deleteFriend(participant.meta.userId)"
        />
      </div>
    </div>
    <div class="flex justify-center py-2">
      <div class="w-[80%] flex pt-2">
        <input
          v-model="inputCode"
          placeholder="Paste your friends code here"
          class="border border-stone-600 rounded h-full mr-1 flex-1"
        />
        <button
          class="not-disabled:(bg-stone-900) text-white rounded p-1 bg-stone-200"
          :disabled="ready"
          @click="addInputFriends"
        >
          add friends
        </button>
      </div>
    </div>
    <SyncDialog :syncing="syncing" @cancel="cancel"></SyncDialog>
  </div>
</template>
<script lang="ts" setup>
import {
  Connector,
  isConnectionCanceled,
  isConnectionRejected,
  Sender,
  type ConnectorStore,
  type Participants,
} from "@/connect";
import { useUser } from "@/hooks/useUser";
import { isCancelError } from "@/utils/cancelablePromise";
import SyncDialog from "@/components/SyncDialog.vue";
import SyncUser from "@/components/SyncUser.vue";
import { MessageType, showMessage } from "@/components/common/message";
import { deleteBillsByCreatorId } from "@/hooks/useBills";
import { show } from "@/hooks/useGlobalConfirm";
import { handleSync } from "@/data/sync";
import { writeToClipboard } from "@/utils/clipboard";

type ParticipantsMeta = {
  userId: string;
  name: string;
};

const { userInfo, allUsers, setMyInfo, removeUserInfo } = useUser();

const connector = Connector.fromStore<ParticipantsMeta>(
  { name: userInfo.value.name, userId: userInfo.value.id },
  {
    peerId: userInfo.value.connectId,
  }
);
connector.addEventListener("update", (ev) => {
  const store = (ev as CustomEvent<ConnectorStore>).detail;
  setMyInfo({ connectId: store.peerId });
});

const ready = ref(true);
connector.addEventListener("ready", () => {
  ready.value = false;
});

onBeforeUnmount(() => {
  connector.destroy();
});

const participants = computed<Participants<ParticipantsMeta>[]>(() =>
  allUsers.value
    .filter(({ me }) => !me)
    .map((u) => ({
      connectId: u.connectId,
      latestTransferTime: u.latestTransferTime,
      meta: {
        name: u.name,
        userId: u.id,
      },
    }))
);

let cancelSyncFn: undefined | (() => void) = undefined;

const syncing = ref(false);
const syncToFriends = async (connectId: string) => {
  console.log("friend id: ", connectId);
  const { start, cancel } = connector.connect(connectId);
  cancelSyncFn = cancel;
  syncing.value = true;
  try {
    const sender = await start();
    const { start: startSync, cancel: cancelSync } = handleSync(sender);
    cancelSyncFn = cancelSync;
    await startSync();
  } catch (error) {
    if (!isCancelError(error)) {
      if (isConnectionRejected(error)) {
        showMessage({
          type: MessageType.Error,
          content: "Connection rejected",
        });
      }
    }
  }
  syncing.value = false;
};
const cancel = () => {
  cancelSyncFn?.();
  syncing.value = false;
};

const inputCode = ref("");
const addInputFriends = () => {
  if (
    inputCode.value &&
    participants.value.every((p) => p.connectId !== inputCode.value)
  ) {
    syncToFriends(inputCode.value);
  }
};

const deleteFriend = async (userId: string) => {
  await show({
    title:
      "Are you sure to delete? This will delete all record created by the user.",
  });
  await deleteBillsByCreatorId(userId);
  await removeUserInfo(userId);
  showMessage({ content: "delete user success!", type: MessageType.Success });
};

connector.onConnection(async (info, acceptConnect, rejectConnect) => {
  try {
    await show({
      title: `${info.name} wants to sync data with you, accepted?`,
    });
    syncing.value = true;
    const sender = await acceptConnect();
    const { start: startSync, cancel: cancelSync } = handleSync(sender, true);
    cancelSyncFn = cancelSync;
    await startSync();
  } catch (error) {
    if (isConnectionCanceled(error)) {
      showMessage({
        type: MessageType.Warning,
        content: "Connection was canceled",
      });
      return;
    }
    rejectConnect();
  }
  syncing.value = false;
});

const copy = async (text: string) => {
  if (!text) return;
  await writeToClipboard(text);
  showMessage({
    content: "Copy code successfully!",
    type: MessageType.Success,
  });
};
</script>
