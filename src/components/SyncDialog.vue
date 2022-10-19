<template>
  <Dialog :visible="syncing" custom-class="sync-status-dialog">
    <div class="p-4 flex flex-col w-full h-full">
      <div>syncing</div>
      <button class="buttoned" @click="cancel">cancel</button>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/common/Dialog.vue";
import { show } from "@/hooks/useGlobalConfirm";

defineProps<{
  syncing: boolean;
}>();

const emit = defineEmits<{
  (name: "cancel"): void;
}>();

const cancel = async () => {
  await show({ title: "Are you sure to cancel syncing?" });
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
