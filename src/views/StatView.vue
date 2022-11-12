<template>
  <div class="w-full h-full flex justify-center">
    <div class="h-full w-full mx-2 max-w-[600px] flex flex-col">
      <div class="filter w-full m-1 p-2">
        <DateRangeSelector
          :start="startDate"
          :end="endDate"
          @change="onDateRangeChange"
        ></DateRangeSelector>
      </div>
      <div>
        <IncomeChart :statistic="statistic"></IncomeChart>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "@vueuse/core";
import DateRangeSelector from "@/components/common/DateRangeSelector.vue";
import IncomeChart from "@/components/IncomeChart.vue";

import { BillType, type Bill } from "@/data/bill";
import { isTimeMatched, useBills } from "@/hooks/useBills";
import dayjs, { Dayjs } from "dayjs";
import { multiFiltered } from "@/utils/filter";
import { useStatistic } from "@/hooks/useStatistic";

const { list: bills } = useBills();
const startDate = computed(() => {
  const bill = bills.value.at(-1);
  if (bill) return dayjs.unix(bill.time);
  return undefined;
});
const endDate = computed(() => {
  const bill = bills.value.at(0);
  if (bill) return dayjs.unix(bill.time);
  return undefined;
});

const rangeStart = ref<Dayjs>();
const rangeEnd = ref<Dayjs>();
const onDateRangeChange = (s: Dayjs, e: Dayjs) => {
  rangeStart.value = s;
  rangeEnd.value = e;
};

const statistic = useStatistic(rangeStart, rangeEnd);
</script>
