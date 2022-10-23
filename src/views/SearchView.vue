<template>
  <div class="w-full h-full flex justify-center p-2">
    <div class="h-full w-full mx-2 max-w-[600px] flex flex-col">
      <div class="search w-full flex justify-center pt-4">
        <div
          class="w-full h-10 shadow-md rounded-sm flex items-center px-4 focus-within:(shadow-lg)"
        >
          <div class="flex-1">
            <Clearable
              :visible="searchText.length > 0"
              @clear="searchText = ''"
            >
              <input
                v-model="searchText"
                type="text"
                class="w-full bg-transparent focus:(border-none outline-none)"
              />
            </Clearable>
          </div>
          <div class="buttoned p-3 rounded-full" @click="search">
            <i class="icon-search"></i>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col overflow-hidden">
        <BillFilter v-model="filter"></BillFilter>
        <div class="text-sm text-gray-500">
          {{ $t("total") }}: {{ list.length }}
        </div>
        <div class="flex-1 divide-y overflow-y-auto">
          <List
            :list="list"
            value-key="id"
            :get-range-height="getRangeHeight"
            :footer-height="96"
          >
            <template #default="{ item }">
              <BillItem :bill="(item as Bill)" @click="show(item)" />
            </template>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isBillMatched, useBills } from "@/hooks/useBills";
import BillFilter, { type FilterProp } from "@/components/BillFilter.vue";
import type { Bill } from "@/data/bill";
import Clearable from "@/components/common/Clearable.vue";
import List from "@/components/common/List.vue";
import { useBillInfo } from "@/hooks/useBillInfo";
import BillItem from "../components/BillItem.vue";

const { list: allBills } = useBills();

const searchText = ref("");
const list = ref<Bill[]>([]);
const filter = ref<FilterProp>();

const search = () => {
  if (!filter.value) {
    list.value = [];
    return;
  }
  const fp = filter.value;
  list.value = allBills.value.filter((b) =>
    isBillMatched(b, { ...fp, comment: searchText.value })
  );
};

const getRangeHeight = (start: number, length: number) => {
  const itemH = 72;
  const end = Math.min(list.value.length, start + length);
  const itemCount = end - start;
  return itemH * itemCount;
};

const { show } = useBillInfo();
</script>
