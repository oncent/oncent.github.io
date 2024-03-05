<template>
  <div ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { echarts, type ECOption } from "./chart";

const props = defineProps<{
  option: ECOption;
  onClick?: (e: any) => void;
}>();

const emit = defineEmits<{
  (name: "click", v: any): void;
}>();
const chartRef = ref<HTMLDivElement>();

const { width } = useWindowSize();
onMounted(() => {
  const chart = echarts.init(chartRef.value!);
  chart.setOption(props.option);
  watch(
    () => props.option,
    () => {
      chart.setOption(props.option);
    }
  );
  onBeforeUnmount(() => {
    chart.dispose();
  });
  watch(width, () => {
    chart.resize();
  });
  chart.on("click", (e) => {
    emit("click", e);
  });
});
</script>
