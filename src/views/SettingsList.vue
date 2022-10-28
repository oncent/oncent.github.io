<template>
  <div class="flex flex-col justify-between flex-1 overflow-y-auto">
    <div class="divide-y flex-1">
      <div class="flex justify-center pt-2 pb-4">
        <UserAvatar :name="userInfo.name" @update:name="updateName" editable />
      </div>
      <div
        class="py-4 px-2 buttoned flex justify-between"
        @click="$router.push('/settings/sync')"
      >
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-cloud"></i>
          </div>
          <div class="px-1">{{ $t("share-and-sync") }}</div>
        </div>
        <div class="flex items-center justify-center">
          <i class="icon-chevron-right"></i>
        </div>
      </div>
      <div
        class="py-4 px-2 buttoned flex justify-between"
        @dblclick="$router.push('/settings/backup')"
      >
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-software-upload"></i>
          </div>
          <div class="px-1 beta">{{ $t("backup") }}</div>
        </div>
        <div class="flex items-center justify-center">
          <i class="icon-chevron-right"></i>
        </div>
      </div>
      <div class="py-4 px-2 flex justify-between buttoned">
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-globe-alt"></i>
          </div>
          <div class="px-1">{{ $t("language") }}</div>
        </div>
        <div>
          <Select v-model="currentLanguage" :list="langList" value-key="id">
            <template #default>
              <div
                class="shadow buttoned w-120px rounded-sm h-full truncate text-center"
              >
                {{ currentLanguage?.name }}
              </div>
            </template>
          </Select>
        </div>
      </div>
      <div class="py-4 px-2 buttoned">
        <a class="flex items-center" :href="$t('help_link')" target="_blank">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-bot"></i>
          </div>
          <div class="px-1">{{ $t("help") }}</div>
        </a>
      </div>
      <div class="py-4 px-2 buttoned flex justify-between items-center">
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-code"></i>
          </div>
          <div class="px-1">{{ $t("version") }}</div>
        </div>
        <div>
          <span>{{ version }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <a
        href="https://github.com/glink25/Cent"
        target="_blank"
        class="flex items-center hover:underline text-sm"
        >Github
        <div class="p-2"><i class="icon-arrow-top-right icon-xs"></i></div
      ></a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUser } from "@/hooks/useUser";
import UserAvatar from "@/components/UserAvatar.vue";
import Select from "@/components/common/Select.vue";
import { locales, currentLanguage, switchLanguage } from "@/locale";

const { userInfo } = useUser();

const updateName = (v: string) => {
  userInfo.value = { ...userInfo.value, name: v };
};

const langList = computed(() =>
  locales.map((l) => ({ name: l.label, id: l.name }))
);

watch(currentLanguage, (v) => {
  if (v?.id) switchLanguage(v.id);
});

const version = __APP_VERSION__;
</script>
<style lang="scss" scoped>
.beta {
  position: relative;
  &::after {
    content: "beta";
    @apply rounded text-white bg-stone-900 absolute left-[100%] top-0 text-xs px-1;
  }
}
</style>
