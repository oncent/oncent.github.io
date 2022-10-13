<template>
  <div class="font-[Helvetica Neue]">{{ selfValue }}</div>
</template>
<script lang="ts" setup>
import { Animation } from "@/utils/animation";
import { Quart } from "@/utils/cubzier";

const props = withDefaults(
  defineProps<{
    value: number;
    init?: boolean;
    toFixed?: number;
    duration?: number;
  }>(),
  {
    toFixed: 1,
    duration: 2,
  }
);

const selfValue = ref<string>("0");

const animation = ref<Animation>();
const createAnimation = (from: number, to: number) => {
  return new Animation(
    from,
    to,
    props.duration,
    (v) => {
      selfValue.value = v.toFixed(props.toFixed);
    },
    Quart.easeOut
  );
};

const updateAnimation = () => {
  animation.value?.stop();
  animation.value = createAnimation(Number(selfValue.value), props.value);
  animation.value.start();
};

if (props.init) {
  updateAnimation();
}
watch(
  () => props.value,
  () => {
    updateAnimation();
  }
);
</script>
