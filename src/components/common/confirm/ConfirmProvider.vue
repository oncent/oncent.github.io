<template>
  <Dialog :visible="controller.visible" custom-class="confirm-dialog z-3">
    <div class="w-full h-full flex p-2 flex-col">
      <div class="w-full flex justify-end">
        <i class="w-10 icon-close buttoned p-2" @click="cancel" />
      </div>
      <div class="flex-1 flex pb-2 mb-4">
        <div class="font-bold flex-1 pl-2 flex items-center">
          {{ controller.title }}
        </div>
      </div>
      <div class="w-full flex justify-end">
        <button class="buttoned shadow rounded px-2 mx-1 px-4" @click="cancel">
          {{ controller.cancelTitle ?? $t("no") }}
        </button>
        <button
          class="mx-1 bg-stone-900 text-white rounded px-4"
          @click="confirm"
        >
          {{ controller.confirmTitle ?? $t("yes") }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "@/components/common/Dialog.vue";

export type Controller = {
  visible: boolean;
  icon?: string;
  title: string;
  confirmTitle?: string | (() => string);
  cancelTitle?: string | (() => string);
  hideCancelButton?: boolean;
  close: (isConfirm: boolean) => void;
};

const props = defineProps<{
  controller: Controller;
}>();

const cancel = () => {
  props.controller.close(false);
};

const confirm = () => {
  props.controller.close(true);
};
</script>
<style lang="scss">
.confirm-dialog {
  .dialog-body {
    @apply w-[90%] h-180px max-w-[350px];
  }
}
</style>
<style lang="scss" scoped>
.footer-button {
  &.secondary {
    &::after {
      background: #2a2933;
    }
    &:hover {
      &::after {
        background: transparent;
      }
    }
  }
}
</style>
