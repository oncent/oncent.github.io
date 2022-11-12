<template>
  <div
    class="bill-switch w-34 h-full rounded-lg relative bg-dark-800 flex items-center p-2 overflow-hidden"
  >
    <div
      class="bill-switch-toggle w-1/2 h-8/10 rounded-lg absolute transition-all flex justify-center items-center text-xs m-2 cursor-pointer"
      :class="{
        income: modelValue === BillType.Income,
        expenses: modelValue === BillType.Expenses,
      }"
      @mousedown.prevent="
        $emit(
          'update:modelValue',
          modelValue === BillType.Expenses ? BillType.Income : BillType.Expenses
        )
      "
    >
      {{ modelValue === BillType.Income ? $t("income") : $t("expenses") }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BillType } from "@/data/bill";

defineProps<{
  modelValue: BillType;
}>();
defineEmits<{
  (name: "update:modelValue", value: BillType): void;
}>();
</script>
<style lang="scss" scoped>
.bill-switch {
  $margin: 1rem;
  &-toggle {
    height: calc(100% - #{$margin});
    &.expenses {
      left: 0%;
      transform: translateX(0);
      @apply bg-red-900;
    }
    &.income {
      left: 100%;
      transform: translateX(calc(-100% - #{$margin}));
      @apply bg-green-900;
    }
  }
}
</style>
