<script setup lang="ts">
const router = useRouter();
const goBack = () => router.back();
</script>

<template>
  <div class="flex flex-col p-2 h-full">
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
      <div>{{ $route.meta.popupTitle }}</div>
    </div>
    <RouterView></RouterView>
  </div>
</template>
