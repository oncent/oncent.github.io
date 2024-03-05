<template>
  <div :style="renderInfo.style" class="list-view overflow-hidden" ref="listEl">
    <!-- <TransitionGroup :name="currentTransitionName" :duration="transitionDuration" @after-leave="afterTransition"> -->
    <template
      v-for="(item, index) in renderInfo.list"
      :key="getKey(item, getRealIndex(index))"
    >
      <slot
        v-bind="{
          item,
          index: getRealIndex(index),
        }"
      >
        <div>{{ item }}</div>
      </slot>
    </template>
    <!-- </TransitionGroup> -->
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
import { throttle } from "lodash-es";
const props = withDefaults(
  defineProps<{
    list: Array<Readonly<any>>;
    valueKey: string | ((v: any, i: number) => string);
    loading?: boolean;
    getRangeHeight: (start: number, length: number) => number;
    remain?: number;
    footerHeight?: number;
    transitionName?: string;
    transitionDuration?: number;
  }>(),
  {
    remain: 20,
    footerHeight: 0,
  }
);

defineEmits<{
  (name: "reachEnd"): void;
}>();

const getKey = (item: any, index: number) => {
  if (props.valueKey === undefined) return index;
  if (typeof props.valueKey === "function") return props.valueKey(item, index);
  return item[props.valueKey];
};

const getRangeHeights = () => {
  const ranges: [number, number][] = [];
  Array.from(
    { length: Math.ceil(props.list.length / props.remain) },
    () => 0
  ).forEach((_, i) => {
    ranges.push([
      (i + 1) * props.remain,
      props.getRangeHeight(i * props.remain + 0, props.remain),
    ]);
  });
  return ranges;
};
const heightRanges = ref<ReturnType<typeof getRangeHeights>>([]);
watchEffect(() => {
  heightRanges.value = getRangeHeights();
});

const findRenderPage = (top: number) => {
  const currentPageIndex = heightRanges.value.findIndex((current, i) => {
    const prevHeight = (() => {
      if (i === 0) return 0;
      return heightRanges.value.slice(0, i).reduce((p, c) => p + c[1], 0);
    })();
    if (prevHeight < top && prevHeight + current[1] >= top) {
      return true;
    }
    return false;
  });
  return currentPageIndex;
};

const pageIndex = ref(-1);

const renderInfo = computed(() => {
  const h =
    heightRanges.value.reduce((p, c) => p + c[1], 0) + props.footerHeight;
  if (pageIndex.value < 2) {
    return {
      startIndex: 0,
      list: props.list.slice(0, props.remain * 3),
      style: `padding-top:${0}px; height:${h}px`,
    };
  }
  const renderStart = heightRanges.value[pageIndex.value - 2][0];

  const renderEd = Math.min(props.list.length, renderStart + props.remain * 3);
  const padTop = heightRanges.value
    .slice(0, pageIndex.value - 1)
    .reduce((p, c) => p + c[1], 0);

  return {
    startIndex: renderStart,
    list: props.list.slice(renderStart, renderEd),
    style: `padding-top:${padTop}px; height:${h}px`,
  };
});

const getRealIndex = (index: number) => renderInfo.value.startIndex + index;

const listEl = ref<HTMLDivElement>();

let ScrollTop = 0;
const onScroll = throttle((e: Event) => {
  const parent = e.target as HTMLDivElement;
  if (!parent || !listEl.value) return;
  const offsetTop = listEl.value.offsetTop - parent.offsetTop;
  const scrollTop = parent.scrollTop - offsetTop;

  pageIndex.value = findRenderPage(scrollTop);
  ScrollTop = parent.scrollTop;
}, 50);

// 支持keep alive
onActivated(() => {
  listEl.value?.parentElement?.addEventListener("scroll", onScroll);
  if(listEl.value?.parentElement){
    listEl.value.parentElement.scrollTop = ScrollTop;
  }
  onDeactivated(() => {
    listEl.value?.parentElement?.removeEventListener("scroll", onScroll);
  });
});

onMounted(() => {
  listEl.value?.parentElement?.addEventListener("scroll", onScroll);
  if(listEl.value?.parentElement){
    listEl.value.parentElement.scrollTop = ScrollTop;
  }
  onBeforeUnmount(() => {
    listEl.value?.parentElement?.removeEventListener("scroll", onScroll);
  });
});

const currentTransitionName = ref<string>();
watch(
  () => props.list.length,
  () => {
    currentTransitionName.value = props.transitionName;
  }
);
const afterTransition = () => {
  currentTransitionName.value = undefined;
};

const scrollTo = (top: number) => {
  listEl.value?.parentElement?.scrollTo({ top, behavior: "smooth" });
};

defineExpose({
  scrollTo,
});
</script>
