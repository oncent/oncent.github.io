<template>
  <div
    class="bill-item flex justify-between items-center px-4 py-4 buttoned cursor-pointer"
  >
    <div class="flex items-center">
      <div
        class="rounded-full bg-white border w-10 h-10 flex items-center justify-center"
      >
        <i :class="[category?.icon]"></i>
      </div>
      <div class="flex flex-col px-4">
        <div class="flex text-md font-semibold">
          <div>{{ category ? $t(category.name) : "" }}</div>
        </div>
        <div class="flex text-xs">
          <div>
            {{ creator?.me ? $t("me") : creator?.name ?? $t("unknown-user") }}
          </div>
          <template v-if="bill.comment">
            <div class="px-1">|</div>
            <div>
              {{ bill.comment }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      class="text-lg font-bold"
      :class="{
        'text-red-700': bill.type === BillType.Expenses,
        'text-green-900': bill.type === BillType.Income,
      }"
    >
      {{ bill.money }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BillType, type Bill } from "@/data/bill";
import { getCategoryById } from "@/data/category";
import { getUserName } from "@/hooks/useUser";

const props = defineProps<{
  bill: Bill;
}>();

const category = computed(() => getCategoryById(props.bill.categoryId));

const creator = computed(() => getUserName(props.bill.creatorId));
</script>
