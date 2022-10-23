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
        {{ $t("year") }}
      </div>
      <div
        class="flex-1 flex justify-center m-1"
        :class="{
          'bg-stone-400 rounded-full text-white': type === 'month',
        }"
        @click="type = 'month'"
      >
        {{ $t("month") }}
      </div>
      <div
        class="flex-1 flex justify-center m-1"
        :class="{
          'bg-stone-400 rounded-full text-white': type === 'custom',
        }"
        @click="type = 'custom'"
      >
        {{ $t("custom") }}
      </div>
    </div>
    <div
      v-if="type !== 'custom'"
      class="slider w-full h-12 flex justify-center items-center overflow-x-scroll snap snap-always snap-mandatory snap-x"
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
        v-model="customFrom"
        display-formatter="YYYY-MM-DD"
        class="text-sm buttoned rounded px-2"
      ></date-time>
      <div>-</div>
      <date-time
        v-model="customTo"
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
    start?: string | object | Dayjs;
    end?: string | object | Dayjs;
    date?: string;
    initialType?: "year" | "month" | "custom";
  }>(),
  {
    start: dayjs().format("YYYY-MM-DD"),
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
  const start = dayjs(props.start as Dayjs).startOf("year");
  const end = dayjs(props.end as Dayjs).startOf("year");
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
  const end = dayjs(props.end as Dayjs).startOf("month");
  const start = dayjs(props.start as Dayjs).startOf("month");
  const diff = end.diff(start, "month") + 1;
  const months: Time[] = Array.from({ length: diff }, (_, i) => {
    const d = start.add(i, "month");
    const name = d.format("YYYY-MM");
    return {
      name,
      range: [d, d.endOf("month")],
    };
  });
  return {
    type: "month",
    times: months as unknown as Time[],
  };
};

const type = ref(props.initialType);

const times = computed(() => {
  if (type.value === "year") return getYears().times;
  if (type.value === "month") return getMonths().times;
  return [
    {
      name: "",
      range: [dayjs(props.start as Dayjs), dayjs(props.end as Dayjs)],
    },
  ] as Time[];
});

const sliderEl = ref<HTMLDivElement>();

const findNearestTime = (d?: string | Dayjs) => {
  const date = dayjs(d);
  const index = [...times.value]
    .reverse()
    .findIndex((t) => date.isAfter(t.range[0]));
  return {
    index,
    time: times.value[index] ?? times.value[0],
  };
};
const selectedTime = ref<Time>();

const customFrom = ref<Dayjs>(dayjs(props.start as Dayjs));
const customTo = ref<Dayjs>(dayjs(props.end as Dayjs));
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
  emit("change", ...selectedTime.value.range);
};

watchEffect(() => {
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
