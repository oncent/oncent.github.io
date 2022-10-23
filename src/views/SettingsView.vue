<script setup lang="ts">
const router = useRouter();
const goBack = () => router.back();
</script>

<template>
  <div class="flex flex-col p-2 h-full overflow-hidden">
    <div class="header flex justify-center items-center relative">
      <div
        class="absolute left-0 flex buttoned rounded-full py-1 pl-1 pr-3"
        @click="goBack"
      >
        <div class="flex items-center justify-center">
          <i class="icon-chevron-left"></i>
        </div>
        {{ $t("back") }}
      </div>
      <div>{{ $route.meta.popupTitle ? $t($route.meta.popupTitle) : "" }}</div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<style lang="scss">
@import "@/styles/animation.scss";

@include slide-left();
@include slide-right();
</style>
