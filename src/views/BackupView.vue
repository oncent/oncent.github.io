<template>
  <div class="flex flex-col">
    <div class="p-2 text-[red]">
      Warning: This is a beta feature that may not fully tested yet, please do
      not clear your data for no reason!
    </div>
    <div class="p-2">
      <div class="py-2 text-sm">last backup: {{ lastBackupTime }}</div>
      <button
        class="my-2 w-full shadow bg-stone-900 text-white py-2 rounded"
        @click="backupExport"
      >
        start backup
      </button>
      <button
        class="my-2 w-full shadow buttoned py-2 rounded"
        :disabled="lastBackupedTime < 0"
        @click="backupImport"
      >
        start import
      </button>
    </div>
    <Dialog :visible="dialogVisible">
      <div>exporting:{{ exportProgress }}</div>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Dialog from "@/components/common/Dialog.vue";
import { MessageType, showMessage } from "@/components/common/message";
import {
  lastBackupedTime,
  useBackupExport,
  useBackupImport,
} from "@/hooks/useBackup";
import { show } from "@/hooks/useGlobalConfirm";
import { showFilePicker, FORMAT_BACKUP } from "@/utils/file";
import dayjs from "dayjs";

const lastBackupTime = computed(() => {
  if (lastBackupedTime.value === -1) return "not backup yet";
  return dayjs.unix(lastBackupedTime.value).format("YYYY-MM-DD HH:mm:ss");
});

const dialogVisible = ref(false);
const {
  progress: exportProgress,
  start: startExport,
  cancel: cancelExport,
} = useBackupExport();

const backupExport = async () => {
  dialogVisible.value = true;
  try {
    await startExport();
    showMessage({ content: "Export success", type: MessageType.Success });
  } catch (error) {
    showMessage({
      content: (error as Error)?.message,
      type: MessageType.Error,
    });
  }
  dialogVisible.value = false;
};

const {
  progress: importProgress,
  start: startImport,
  cancel: cancelImport,
} = useBackupImport();
const backupImport = async () => {
  await show({
    title:
      "This will replace all your current data, please make sure you have your data backup.",
  });
  const [file] = await showFilePicker({ accept: FORMAT_BACKUP });
  dialogVisible.value = true;
  try {
    await startImport(file);
    showMessage({ content: "Import data success", type: MessageType.Success });
  } catch (error) {
    showMessage({
      content: (error as Error)?.message,
      type: MessageType.Error,
    });
  }
  dialogVisible.value = false;
};
</script>
