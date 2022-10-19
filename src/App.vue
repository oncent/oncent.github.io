<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import PopupRouterView from "@/components/common/PopupRouterView.vue";
import { CustomMessage } from "@/components/common/message";
import ConfirmProvider from "@/components/common/confirm/ConfirmProvider.vue";
import { controller } from "@/hooks/useGlobalConfirm";
import BillInfo from "@/components/BillInfo.vue";
import { useBillInfo } from "@/hooks/useBillInfo";

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

const { controller: billInfoController } = useBillInfo();
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
  <BillInfo :controller="billInfoController"></BillInfo>
  <CustomMessage />
  <ConfirmProvider :controller="controller" />
</template>
<style lang="scss">
@import "@/styles/animation.scss";

@include fade();
@include popup-slide();
</style>
