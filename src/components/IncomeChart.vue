<template>
  <div class="w-full px-2 flex flex-col items-center">
    <div class="flex items-center shadow-inner rounded-full p-1">
      <div class="flex justify-center items-center w-12 h-6 rounded-full"
        :class="{ 'bg-stone-700 text-white': chartType === 'pie' }" @click="chartType = 'pie'">
        <div class="transform translate-y-[-30%]">
          <i class="icon-chart icon-xs"></i>
        </div>
      </div>
      <div class="flex justify-center items-center w-12 h-6 rounded-full"
        :class="{ 'bg-stone-700 text-white': chartType === 'line' }" @click="chartType = 'line'">
        <div class="transform translate-y-[30%]">
          <i class="icon-trending icon-xs"></i>
        </div>
      </div>
    </div>
    <KeepAlive>
      <template v-if="chartType === 'pie'">
        <Chart class="w-full aspect-square max-h-300px" :option="pieChartOption" @click="onPieChartClick"></Chart>
      </template>
      <template v-else>
        <Chart class="w-full aspect-square max-h-300px" :option="lineChartOption"></Chart>
      </template>
    </KeepAlive>
    <div class="flex w-full px-2 items-center justify-between">
      <Select v-model="selectedUsers" :list="allUsers" multiple value-key="id" placement="bottom-left">

        <template #default="{ allSelected }">
          <div class="shadow buttoned px-4 max-w-[160px] rounded-full h-full truncate mx-2 py-1 flex items-center">
            <i class="icon-smile-no-mouth icon-xs"></i>
            <div class="px-2">
              {{
          allSelected
            ? $t("all")
            : selectedUsers.length === 0
              ? "None"
              : selectedUsers.map((c) => c.name).join(",")
        }}
            </div>
          </div>
        </template>
      </Select>
      <div class="flex items-center">
        <Select v-model="currentType" :list="(statisticTypes as any)">
          <div class="rounded buttoned h-full truncate flex items-center px-2">
            <div class="pr-2">
              <i class="icon-arrows-exchange-alt-v icon-xs"></i>
            </div>
            {{ $t(currentType) }}:
          </div>

          <template #option="{ item }">
            {{ $t(item) }}
          </template>
        </Select>
        <div>{{ totals[currentType] }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chart from "@/components/common/chart/Chart.vue";
import type { ECOption } from "@/components/common/chart/chart";
import Select from "@/components/common/Select.vue";
import { useLimitedMultiSelect } from "@/hooks/useLimitSelect";
import { type User, useUser } from "@/hooks/useUser";
import {
  type BillStatistic,
  type StatisticType,
  transformToPieData,
  transformToLineData,
  statisticTypes,
} from "@/hooks/useStatistic";
import { KeepAlive } from "vue";
import { accAdd as add } from "@/utils/math";
import { reverse } from "lodash-es";

const props = defineProps<{
  statistic: BillStatistic;
}>();

const currentType = ref<StatisticType>("expenses");

const selectedUsers = ref<User[]>([]);
const { allUsers } = useUser();
useLimitedMultiSelect(selectedUsers, allUsers);

const chartType = ref<"pie" | "line">("pie");

const expensePieDataset = computed(() =>
  transformToPieData(props.statistic, selectedUsers.value, "expenses")
);
const incomePieDataset = computed(() =>
  transformToPieData(props.statistic, selectedUsers.value, "income")
);
const sumPieDataset = computed(() =>
  transformToPieData(props.statistic, selectedUsers.value, "sum")
);

const totals = computed(() => {
  return {
    expenses: expensePieDataset.value.reduce((p, c) => add(p, c.total), 0),
    income: incomePieDataset.value.reduce((p, c) => add(p, c.total), 0),
    sum: sumPieDataset.value.reduce((p, c) => add(p, c.total), 0),
  };
});

const pieDataset = computed(() => {
  switch (currentType.value) {
    case "expenses":
      return expensePieDataset.value;
    case "income":
      return incomePieDataset.value;
    case "sum":
      return sumPieDataset.value;
    default:
      return [];
  }
});

const pieTitle = ref("");
const currentCategory = ref("")
const onPieChartClick = (e: any) => {
  if (e.data) {
    pieTitle.value = `${e.data.category}: ${e.data.total}`;
    currentCategory.value = e.data.name;
  }
};
watch(currentType, () => {
  pieTitle.value = "";
  currentCategory.value = "";
});

defineExpose({
  currentCategory,
  currentType,
  selectedUsers,
})

const pieChartOption = computed(() => {
  const op: ECOption = {
    title: {
      text: pieTitle.value,
      left: "center",
      top: "center",
    },
    dataset: {
      dimensions: ["category", "total"],
      source: toRaw(pieDataset.value),
    },
    tooltip: {
          show: true,
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

const lineData = computed(() =>
  transformToLineData(props.statistic, allUsers.value, currentType.value)
);
const lineChartOption = computed(() => {
  const op: ECOption = {
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
          show: true,
          formatter: '{a}: {c0}'
    },
    series: lineData.value.values.map(({data,user}) => ({
      data: reverse(data),
      type: 'line',
      name: user.name
    }))
  };
  return op;
});
</script>
