<template>
  <label class="flex items-center relative">
    <slot name="icon">
      <i class="icon-xs icon-calendar"></i>
    </slot>
    <div class="mx-2">{{ display(dayjs(modelValue as string)) }}</div>
    <input
      type="datetime-local"
      class="absolute top-0 left-0 w-2 h-full opacity-0"
      @click="onClickInput"
      @change="onTimeChange"
    />
  </label>
</template>
<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs";
const props = withDefaults(
  defineProps<{
    modelValue?: string | object | Dayjs;
    formatter?: (time: Dayjs) => string | Dayjs;
    displayFormatter?: string | ((time: Dayjs) => string);
  }>(),
  {
    displayFormatter: "MM-DD",
  }
);
const emit = defineEmits<{
  (name: "update:modelValue", value: string | Dayjs): void;
}>();

const display =
  typeof props.displayFormatter === "function"
    ? props.displayFormatter
    : (d: Dayjs) => d.format(props.displayFormatter as string);

if (props.modelValue === undefined) {
  emit("update:modelValue", props.formatter?.(dayjs()) ?? dayjs());
}

const onClickInput = (e: MouseEvent) => {
  (e.target as HTMLInputElement).showPicker();
};

const onTimeChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  const time = dayjs(value);
  emit("update:modelValue", props.formatter?.(time) ?? time);
};
</script>
