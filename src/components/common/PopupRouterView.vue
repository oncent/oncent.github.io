<template>
  <div
    class="popup-view fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1"
  >
    <div
      class="popup-view-modal absolute w-[200%] h-[200%] bg-black opacity-50"
      @click.stop="onClickModel"
    ></div>
    <div
      class="popup-view-body z-1 w-screen h-screen sm:(max-w-[550px] max-h-[550px] min-w-[400px] min-h-[400px] w-[60%] h-[50%] top-auto left-auto rounded-lg) bg-[white]"
      :class="bodyClass"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  closeOnModal?: boolean;
  bodyClass?: string;
}>();

const router = useRouter();
const onClickModel = () => {
  if (props.closeOnModal) {
    router.back();
  }
};
</script>
<style lang="scss" scoped>
.popup-view-body {
  padding-top: env(safe-area-inset-top);
}
</style>
