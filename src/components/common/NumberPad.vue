<template>
  <div class="numpad grid grid-cols-4">
    <button class="item" @click="input(1)">1</button>
    <button class="item" @click="input(2)">2</button>
    <button class="item" @click="input(3)">3</button>
    <button class="item" @click="input('-')">-</button>

    <button class="item" @click="input(4)">4</button>
    <button class="item" @click="input(5)">5</button>
    <button class="item" @click="input(6)">6</button>
    <button class="item" @click="input('+')">+</button>

    <button class="item" @click="input(7)">7</button>
    <button class="item" @click="input(8)">8</button>
    <button class="item" @click="input(9)">9</button>
    <button class="item" @click="$emit('back')">{{ $t("back") }}</button>

    <button class="item" @click="input('.')">.</button>
    <button class="item" @click="input(0)">0</button>
    <button class="item" @click="remove()">
      <div>
        <i class="icon-backspace"></i>
      </div>
    </button>
    <button
      class="flex justify-center items-center bg-green-700 rounded-lg m-2 font-bold text-lg cursor-pointer"
      @click="$emit('confirm', result())"
    >
      <i class="icon-check icon-md"></i>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { createNumpadController, type NumpadInput } from "@/utils/numpad";

export type ChangeValue = {
  value: number;
  text: string;
  initValue?: number;
};

const props = defineProps<{
  initValue?: number;
}>();

const emit = defineEmits<{
  (name: "back"): void;
  (name: "confirm", value: ChangeValue): void;
  (name: "change", value: ChangeValue): void;
}>();

const {
  input: inputToNumpad,
  result,
  remove: removeToNumpad,
} = createNumpadController(props.initValue);

const input = (v: NumpadInput) => {
  inputToNumpad(v);
  emit("change", result());
};

const remove = (index?: number) => {
  removeToNumpad(index);
  emit("change", result());
};
</script>
<style lang="scss" scoped>
.item {
  @apply flex justify-center items-center h-15 sm:(h-8) m-2 font-bold text-lg cursor-pointer rounded-full transition-all hover:(bg-stone-700) active:(bg-stone-500);
}
</style>
