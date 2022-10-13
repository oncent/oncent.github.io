<template>
  <teleport to="body">
    <div
      class="floating-tab fixed w-screen h-18 flex items-center justify-around sm:(h-screen w-18 flex-col justify-start) z-0"
    >
      <div
        class="w-14 h-14 sm:(w-10 h-10) cursor-pointer flex items-center justify-center rounded-full shadow-md m-2 bg-white transition-all hover:(bg-gray-200) active:(bg-gray-300)"
        :class="{ 'bg-gray-300': currentTab === 'search' }"
        @click="switchTab('search')"
      >
        <i class="icon-search"></i>
      </div>
      <div
        class="flex items-center rounded-full p-1 bg-white w-56 h-14 m-2 shadow-md sm:(flex-col w-10 h-50 -order-1)"
      >
        <div
          class="flex-1 h-full w-full transition rounded-full flex items-center justify-center cursor-pointer hover:(bg-gray-200) active:(bg-gray-300)"
          :class="{ 'bg-gray-300': currentTab === 'home' }"
          @click="switchTab('home')"
        >
          <i class="icon-format-left"></i>
        </div>
        <div
          class="w-18 h-18 sm:(w-14 h-14) rounded-full bg-stone-900 shadow-md flex items-center justify-center m-1 cursor-pointer transform transition-all hover:(scale-105)"
          @click="showEditor"
        >
          <i class="icon-md icon-math-plus text-[white]"></i>
        </div>
        <div
          class="flex-1 h-full w-full transition-all rounded-full flex items-center justify-center cursor-pointer hover:(bg-gray-200) active:(bg-gray-300)"
          :class="{ 'bg-gray-300': currentTab === 'stat' }"
          @click="switchTab('stat')"
        >
          <div class="transform translate-x-[25%] translate-y-[-25%]">
            <i class="icon-chart"></i>
          </div>
        </div>
      </div>
      <div
        class="w-14 h-14 sm:(w-10 h-10) cursor-pointer flex items-center justify-center rounded-full shadow-md m-2 bg-white transition-all hover:(bg-gray-200) active:(bg-gray-300)"
        @click="showSettings"
      >
        <i class="icon-more-alt"></i>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { requestAutofocus } from "@/utils/capability";

const route = useRoute();
const router = useRouter();
const currentTab = computed(() =>
  ["stat", "home", "search"].find((x) => route.fullPath.includes(x))
);

const switchTab = (value: "home" | "stat" | "search") => {
  router.push(value);
};

const showEditor = () => {
  router.push("/edit");
  requestAutofocus();
};

const showSettings = () => {
  router.push("/settings");
};
</script>
<style lang="scss" scoped>
.floating-tab {
  bottom: calc(0.25rem + env(safe-area-inset-bottom));
  @media (min-width: 640px) {
    top: env(safe-area-inset-top);
    left: calc(0.25rem + env(safe-area-inset-left));
  }
}
</style>
