<template>
  <div class="flex flex-col items-center">
    <div
      class="flex justify-around rounded-full items-center max-w-300px w-full"
    >
      <div
        class="flex-1 flex justify-center m-1"
        :class="{
          'bg-stone-400 rounded-full text-white': type === 'year',
        }"
        @click="type = 'year'"
      >
        Year
      </div>
      <div
        class="flex-1 flex justify-center m-1"
        :class="{
          'bg-stone-400 rounded-full text-white': type === 'month',
        }"
        @click="type = 'month'"
      >
        Month
      </div>
      <div
        class="flex-1 flex justify-center m-1"
        :class="{
          'bg-stone-400 rounded-full text-white': type === 'custom',
        }"
        @click="type = 'custom'"
      >
        Custom
      </div>
    </div>
    <div
      v-if="type !== 'custom'"
      class="slider w-full h-12 flex items-center overflow-x-scroll snap snap-always snap-mandatory snap-x"
      :key="type"
      ref="sliderEl"
    >
      <div
        v-for="(time, i) in times"
        :key="time.name"
        class="whitespace-nowrap mx-2 px-2 rounded-sm snap-center text-sm"
        :class="[
          { 'bg-stone-700 text-white': time.name === selectedTime?.name },
          `slider-item-${i}`,
        ]"
        @click="selectTime(time, i)"
      >
        {{ time.name }}
      </div>
    </div>
    <div v-else class="flex justify-around items-center w-full h-12">
      <date-time
        :model-value="customFrom"
        display-formatter="YYYY-MM-DD"
        class="text-sm buttoned rounded px-2"
      ></date-time>
      <div>-</div>
      <date-time
        :model-value="customTo"
        display-formatter="YYYY-MM-DD"
        class="text-sm buttoned rounded px-2"
      ></date-time>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs";
import DateTime from "@/components/common/DateTime.vue";

const props = withDefaults(
  defineProps<{
    start?: string;
    end?: string;
    date?: string;
    initialType?: "year" | "month" | "custom";
  }>(),
  {
    start: "2000-01-01",
    end: dayjs().format("YYYY-MM-DD"),
    initialType: "month",
  }
);

const emit = defineEmits<{
  (name: "change", start: Dayjs, end: Dayjs): void;
}>();

type Time = {
  name: string;
  range: [Dayjs, Dayjs];
};

const getYears = () => {
  const start = dayjs(props.start).startOf("year");
  const end = dayjs(props.end).startOf("year");
  const startYear = start.year();
  const endYear = end.year();
  return {
    type: "year",
    times: Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      return {
        name: `${startYear + i}`,
        range: [
          dayjs(`${startYear + i}`),
          dayjs(`${startYear + i}`).endOf("year"),
        ],
      } as Time;
    }),
  };
};

const getMonths = () => {
  const end = dayjs(props.end);
  const start = dayjs(props.start).startOf("month");
  const times: Time[] = [];
  let nextS = start;
  while (nextS.isBefore(end)) {
    times.push({
      name: nextS.format("YYYY-MM"),
      range: [nextS, nextS.endOf("month")],
    });
    nextS = nextS.add(1, "month");
  }
  return {
    type: "month",
    times,
  };
};

const type = ref(props.initialType);

const times = computed(() => {
  if (type.value === "year") return getYears().times;
  if (type.value === "month") return getMonths().times;
  return [
    { name: "", range: [dayjs(props.start), dayjs(props.end)] },
  ] as Time[];
});

const sliderEl = ref<HTMLDivElement>();

const findNearestTime = (d?: string | Dayjs) => {
  const date = dayjs(d);
  const index = times.value.findIndex((t) => date.isBefore(t.range[1]));
  return {
    index,
    time: times.value[index] ?? times.value[0],
  };
};
const selectedTime = ref<Time>();

const customFrom = ref<Dayjs>();
const customTo = ref<Dayjs>();
const setNearestTime = () => {
  const { index, time } = findNearestTime(customFrom.value);
  selectTime(time, index, false);
};

onMounted(() => {
  setNearestTime();
});

watch(type, (v) => {
  if (v !== "custom")
    nextTick(() => {
      setNearestTime();
    });
});

const selectTime = (t: Time, i: number, smooth = true) => {
  selectedTime.value = t;
  if (sliderEl.value) {
    document.querySelector(`.slider-item-${i}`)?.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: smooth ? "smooth" : undefined,
    });
  }
};

watchEffect(() => {
  if (selectedTime.value) {
    customFrom.value = selectedTime.value.range[0];
    customTo.value = selectedTime.value.range[1];
  }
  if (customFrom.value && customTo.value) {
    emit("change", customFrom.value, customTo.value);
  }
});
</script>
<style lang="scss" scoped>
.slider {
  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
}
</style>
