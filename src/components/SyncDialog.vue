<template>
  <Dialog :visible="syncing" custom-class="sync-status-dialog">
    <div class="p-4 flex flex-col w-full h-full items-center">
      <div class="flex-1 flex items-center">
        <div>
          <i class="icon-spinner"></i>
        </div>
        <div class="px-2">{{ $t("syncing") }}</div>
      </div>
      <button class="buttoned" @click="cancel">{{ $t("cancel") }}</button>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/common/Dialog.vue";
import { show } from "@/hooks/useGlobalConfirm";
import { t } from "@/locale";

defineProps<{
  syncing: boolean;
}>();

const emit = defineEmits<{
  (name: "cancel"): void;
}>();

const cancel = async () => {
  await show({ title: t("are-you-sure-to-cancel-syncing") });
  emit("cancel");
};
</script>
<style lang="scss">
.sync-status-dialog {
  .dialog-body {
    @apply w-[90%] h-[300px] max-w-[400px];
  }
}
</style>
