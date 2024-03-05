<template>
  <div class="w-full h-full flex justify-center p-2">
    <div class="h-full w-full mx-2 max-w-[600px] flex flex-col">
      <div class="search w-full flex justify-center pt-4">
        <div class="w-full h-10 shadow-md rounded-sm flex items-center px-4 focus-within:(shadow-lg)">
          <div class="flex-1">
            <Clearable :visible="searchText.length > 0" @clear="searchText = ''">
              <input v-model="searchText" type="text" class="w-full bg-transparent focus:(border-none outline-none)" />
            </Clearable>
          </div>
          <div class="buttoned p-3 rounded-full" @click="search">
            <i class="icon-search"></i>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col overflow-hidden">
        <BillFilter ref="filterRef"></BillFilter>
        <div class="flex items-center justify-between px-2">
          <div class="text-sm text-gray-500">
            {{ $t("total") }}: {{ sortedList.length }}
          </div>
          <div @click="switchMoneySorter" class="px-4 py-2 buttoned rounded-full">
            <div v-if="moneySorter === undefined" class="icon-sort-az opacity-40">
            </div>
            <div v-else-if="moneySorter === 'asc'" class="icon-sort-za">
            </div>
            <div v-else-if="moneySorter === 'desc'" class="icon-sort-az">
            </div>
          </div>
        </div>
        <div class="flex-1 divide-y overflow-y-auto">
          <List :list="sortedList" value-key="id" :get-range-height="getRangeHeight" :footer-height="96">
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
import { orderBy } from "lodash-es";

const { list: allBills } = useBills();

const searchText = ref("");
const list = ref<Bill[]>([]);

const route = useRoute();
const getRouteFilter = () => route.query.filters ? JSON.parse(route.query.filters as string) : undefined;
const filterRef = ref<InstanceType<typeof BillFilter>>()

const moneySorterValues = [undefined, 'asc', 'desc'] as const;
const moneySorter = ref<typeof moneySorterValues[number]>();
const switchMoneySorter = () => {
  const index = moneySorterValues.findIndex(v => v === moneySorter.value);
  const nextIndex = index + 1 >= moneySorterValues.length ? 0 : index + 1;
  moneySorter.value = moneySorterValues[nextIndex];
}

const sortedList = computed(() => {
  if (moneySorter.value === undefined) return list.value;
  return orderBy(list.value, ['money'], [moneySorter.value])
})

const search = () => {
  const currentFilter = filterRef.value?.getFilter()
  if (!currentFilter) {
    list.value = [];
    return;
  }
  const fp = currentFilter;
  list.value = allBills.value.filter((b) =>
    isBillMatched(b, { ...fp, comment: searchText.value })
  );
};


onActivated(() => {
  const routeFilter = getRouteFilter();
  if (routeFilter) {
    filterRef.value?.setFilter(routeFilter)
    filterRef.value?.toggleExpand(true)
    search()
  }
})

const getRangeHeight = (start: number, length: number) => {
  const itemH = 72;
  const end = Math.min(list.value.length, start + length);
  const itemCount = end - start;
  return itemH * itemCount;
};

const { show } = useBillInfo();
</script>
