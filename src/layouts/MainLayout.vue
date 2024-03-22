<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import FloatingTab from "../components/FloatingTab.vue";
import { useMobile } from "@/hooks/useMobile";

const transitionName = ref("slide-in");
const isMobile = useMobile()

const router=useRouter()
router.beforeEach((to,from)=>{
  const curIndex = isMobile.value ? from.meta.mobileMenuIndex : from.meta.pcMenuIndex;
  const nextIndex = isMobile.value ? to.meta.mobileMenuIndex : to.meta.pcMenuIndex;
  if (curIndex !== undefined && nextIndex !== undefined) {
    transitionName.value = nextIndex < curIndex ? 'slide-out' : "slide-in";
  }
})

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
      <transition :name="transitionName" mode="out-in">
        <keep-alive>
          <component :is="getLastComponent(Component, route)"></component>
        </keep-alive>
      </transition>
    </router-view>
    <floating-tab></floating-tab>
  </div>
</template>
<style lang="scss">
@import "@/styles/animation.scss";

// @include slide-left();
// @include slide-right();

@include slide-in();
@include slide-out();
</style>
