<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="visible"
        class="dialog fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-2"
        :class="[customClass]"
      >
        <div
          class="dialog-modal absolute w-[200%] h-[200%] bg-black opacity-50"
          @click.stop="onClickModel"
        ></div>
        <div
          class="dialog-body z-1 max-w-[550px] max-h-[550px] rounded-sm bg-[white]"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
const props = defineProps<{
  visible: boolean;
  customClass?: string;
  closeOnModal?: boolean;
}>();
const emit = defineEmits<{
  (name: "update:visible", value: boolean): void;
}>();

const onClickModel = () => {
  if (props.closeOnModal) {
    emit("update:visible", false);
  }
};
</script>
<style lang="scss">
@import "@/styles/animation.scss";

@include fade();
</style>
