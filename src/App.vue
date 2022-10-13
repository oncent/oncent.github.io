<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import PopupRouterView from "@/components/common/PopupRouterView.vue";
import { CustomMessage } from "@/components/common/message";

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

const getPopupComponent = <T = any>(
  comp: T,
  route: RouteLocationNormalizedLoaded
) => {
  if (route.meta.popup) {
    return comp;
  }
};
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="getLastComponent(Component, route)"></component>
    </transition>
    <teleport to="body">
      <transition :name="'popup-slide'" :duration="300">
        <popup-router-view
          v-if="getPopupComponent(Component, route)"
          v-bind="route.meta.popupOption"
        >
          <component :is="getPopupComponent(Component, route)"></component>
        </popup-router-view>
      </transition>
    </teleport>
  </router-view>
  <CustomMessage />
</template>
<style lang="scss">
@import "@/styles/animation.scss";

@include fade();
@include popup-slide();
</style>
