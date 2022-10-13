<template>
  <div ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { echarts, type ECOption } from "./chart";

const props = defineProps<{
  option: ECOption;
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
});
</script>
