<template>
  <div
    class="popup-view fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1"
  >
    <div
      class="popup-view-modal absolute w-[200%] h-[200%] bg-black opacity-50"
      @click.stop="onClickModel"
    ></div>
    <div
      class="popup-view-body flex z-1 w-screen h-screen sm:(max-w-[550px] min-w-[400px] w-[60%] h-[55%] top-auto left-auto rounded-lg) bg-[white]"
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

const route = useRoute();
const isParentRoute = computed(() => {
  const parent = route.matched[route.matched.length - 2];
  return parent.path === route.path;
});
const router = useRouter();
const onClickModel = () => {
  if (props.closeOnModal && isParentRoute.value) {
    router.back();
  }
};
</script>
<style lang="scss" scoped>
.popup-view-body {
  padding-top: env(safe-area-inset-top);
}
</style>
