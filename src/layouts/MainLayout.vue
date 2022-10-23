<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import FloatingTab from "../components/FloatingTab.vue";
const lastComponent = ref<any>();
const getLastComponent = <T = any>(
  comp: T,
  route: RouteLocationNormalizedLoaded
) => {
  if (route.meta.popup) {
    return lastComponent.value;
  }
  lastComponent.value = comp;
  return comp;
};
</script>

<template>
  <div class="w-full h-full sm:(pl-18)">
    <router-view v-slot="{ Component, route }">
      <transition name="slide-right" mode="out-in">
        <component :is="getLastComponent(Component, route)"></component>
      </transition>
    </router-view>
    <floating-tab></floating-tab>
  </div>
</template>
<style lang="scss">
@import "@/styles/animation.scss";

@include slide-left();
@include slide-right();
</style>
