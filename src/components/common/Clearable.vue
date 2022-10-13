<template>
  <div class="clearable flex items-center">
    <slot></slot>
    <div
      class="close buttoned rounded-full"
      :class="{ visible }"
      @click="$emit('clear')"
    >
      <i class="icon-close icon-xs opacity-30"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  visible?: boolean;
}>();
defineEmits<{
  (name: "clear"): void;
}>();
</script>
<style lang="scss" scoped>
.clearable {
  .close {
    opacity: 0;
    pointer-events: none;
    cursor: pointer;
    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }
  //   &:hover {
  //     .close {
  //       opacity: 1;
  //       pointer-events: auto;
  //       cursor: pointer;
  //     }
  //   }
}
</style>
