<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <UserAvatar :name="name" size="40px" />
      <div class="flex flex-col justify-between px-2">
        <div>{{ Boolean(name) ? name : "untitled" }}</div>
        <div class="text-xs text-stone-600">last sync: {{ latestUpdate }}</div>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mx-1">
        auto sync:
        <Switch
          :model-value="autoSync"
          @update:model-value="$emit('update:autoSync', $event)"
        />
      </div>
      <div class="mx-1">
        <button class="buttoned shadow px-2 rounded" @click="$emit('sync')">
          sync
        </button>
      </div>
      <div class="mx-1 flex items-center">
        <button class="rounded buttoned" @click="$emit('delete')">
          <i class="icon-close"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserAvatar from "./UserAvatar.vue";
import Switch from "@/components/common/Switch.vue";

defineProps<{
  name: string;
  latestUpdate?: number;
  autoSync: boolean;
}>();

defineEmits<{
  (name: "sync"): void;
  (name: "delete"): void;
  (name: "update:autoSync", v: boolean): void;
}>();
</script>
