<template>
  <Popover
    ref="popover"
    placement="bottom-right"
    offset="-1.5rem"
    trigger="focus"
  >
    <slot v-bind="{ allSelected }">
      <div class="shadow buttoned w-100px h-full truncate">
        {{ multiple ? modelValue.join("") : modelValue }}
      </div>
    </slot>
    <template #overlay>
      <div
        class="w-200px bg-white rounded shadow-lg border max-h-40vh overflow-y-auto"
      >
        <slot
          v-if="multiple"
          name="select-all"
          v-bind="{
            allSelected,
            toggle: toggleSelectAll,
          }"
        >
          <div
            class="p-2 buttoned"
            :class="{ '!bg-gray-700 text-white': allSelected }"
            @click="toggleSelectAll"
          >
            {{ $t("select-all") }}
          </div>
        </slot>
        <template v-for="(item, index) in list" :key="getKey(item, index)">
          <slot
            name="option"
            v-bind="{
              item,
              index,
              select: () => doSelect(item, index),
              selected: isSelected(item, index),
            }"
          >
            <div
              class="p-2 buttoned"
              :class="{ '!bg-gray-700 text-white': isSelected(item, index) }"
              @click="doSelect(item, index)"
            >
              {{ item.name }}
            </div>
          </slot>
        </template>
      </div>
    </template>
  </Popover>
</template>
<script lang="ts" setup>
import Popover from "@/components/common/Popover.vue";

const props = defineProps<{
  list: any[];
  modelValue: any;
  valueKey?: string | ((v: any, i: number) => string);
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (name: "update:modelValue", value: any): void;
}>();

const getKey = (item: any, index: number) => {
  if (props.valueKey === undefined) return index;
  if (typeof props.valueKey === "function") return props.valueKey(item, index);
  return item[props.valueKey];
};

const isSelected = (item: any, index: number) => {
  if (props.multiple) {
    return (props.modelValue as any[])?.some(
      (t, i) => getKey(t, i) === getKey(item, index)
    );
  }

  return getKey(props.modelValue, -1) === getKey(item, index);
};

const popover = ref<InstanceType<typeof Popover>>();
const doSelect = (item: any, index: number) => {
  if (props.multiple) {
    if (!isSelected(item, index)) {
      emit("update:modelValue", [...props.modelValue, item]);
      return;
    }
    emit(
      "update:modelValue",
      (props.modelValue as any[]).filter(
        (t, i) => getKey(t, i) !== getKey(item, index)
      )
    );
    return;
  }
  popover.value?.blur();
  emit("update:modelValue", item);
  return;
};

const allSelected = computed({
  get: () => {
    return props.list.every((item, i) => isSelected(item, i));
  },
  set: (v) => {
    if (v) {
      emit("update:modelValue", props.list);
      return;
    }
    emit("update:modelValue", []);
  },
});

const toggleSelectAll = () => (allSelected.value = !allSelected.value);
</script>
<style lang="scss">
.option {
  &:hover {
    background: red;
  }
}
</style>
