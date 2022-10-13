<script setup lang="ts">
import { useUser } from "@/hooks/useUser";
import UserAvatar from "@/components/UserAvatar.vue";
import Select from "@/components/common/Select.vue";
import { locales, localLanguage, switchLanguage } from "@/locale";

const { userInfo } = useUser();

const updateName = (v: string) => {
  userInfo.value = { ...userInfo.value, name: v };
};

const router = useRouter();
const goBack = () => router.back();

const selectedLanguage = computed({
  get: () => {
    const initialLang = locales.find((l) => l.name === localLanguage.value);
    return initialLang
      ? { name: initialLang.label, id: initialLang.name }
      : undefined;
  },
  set: (v) => {
    localLanguage.value = v?.id;
  },
});
const langList = computed(() =>
  locales.map((l) => ({ name: l.label, id: l.name }))
);

watch(selectedLanguage, (v) => {
  if (v?.id) switchLanguage(v.id);
});
</script>

<template>
  <div class="flex flex-col p-2">
    <div class="header flex">
      <div class="flex buttoned rounded-full py-1 px-3" @click="goBack">
        <div class="flex items-center justify-center">
          <i class="icon-chevron-left"></i>
        </div>
        {{ $t("back") }}
      </div>
    </div>
    <div class="divide-y">
      <div class="flex justify-center pt-2 pb-4">
        <UserAvatar :name="userInfo.name" @update:name="updateName" editable />
      </div>
      <div class="py-4 px-2">
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-cloud"></i>
          </div>
          <div class="px-1">{{ $t("share-and-sync") }}</div>
        </div>
      </div>
      <div class="py-4 px-2 flex justify-between">
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-globe-alt"></i>
          </div>
          <div class="px-1">{{ $t("language") }}</div>
        </div>
        <div>
          <Select v-model="selectedLanguage" :list="langList" value-key="id">
            <template #default>
              <div
                class="shadow buttoned w-120px rounded-sm h-full truncate text-center"
              >
                {{ selectedLanguage?.name }}
              </div>
            </template>
          </Select>
        </div>
      </div>
      <div class="py-4 px-2">
        <div class="flex items-center">
          <div class="w-9 flex items-center justify-center">
            <i class="icon-bot"></i>
          </div>
          <div class="px-1">{{ $t("help") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
