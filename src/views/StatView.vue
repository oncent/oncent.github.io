<template>
  <div class="w-full h-full flex justify-center">
    <div class="h-full w-full mx-2 max-w-[600px] flex flex-col">
      <div class="filter w-full m-1 p-2">
        <DateRangeSelector></DateRangeSelector>
      </div>
      <div class="w-full flex flex-col items-center">
        <Chart
          :option="chartOption"
          class="w-full aspect-square max-h-300px"
        ></Chart>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DateRangeSelector from "@/components/common/DateRangeSelector.vue";
import { BillType, type Bill } from "@/data/bill";
import { useBills } from "@/hooks/useBills";
import Chart from "@/components/common/chart/Chart.vue";
import type { ECOption } from "@/components/common/chart/chart";
import { BillCategories } from "@/data/category";
import { t } from "@/locale";

const { list: bills } = useBills();

const transformToDataset = (list: Bill[]) => {
  const categories = Object.fromEntries(
    BillCategories.filter(({ type }) => type === BillType.Expenses).map(
      (cate) => {
        return [cate.id, { total: 0, name: t(cate.name) }];
      }
    )
  );
  list.forEach((item) => {
    if (categories[item.categoryId]) {
      categories[item.categoryId].total =
        categories[item.categoryId].total + item.money;
    }
  });
  return Object.entries(categories)
    .filter(([_, { total }]) => total !== 0)
    .map(([_, v]) => ({
      category: v.name,
      ...v,
    }));
};

const billDataset = computed(() => transformToDataset(bills.value));
const chartOption = computed(() => {
  const op: ECOption = {
    dataset: {
      dimensions: ["category", "total"],
      source: toRaw(billDataset.value),
    },
    xAxis: { type: "category", show: false },
    yAxis: {},
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        stillShowZeroSum: false,
        // label: { show: false },
      },
    ],
  };
  return op;
});
</script>
