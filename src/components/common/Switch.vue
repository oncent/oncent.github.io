<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <span class="slider round"></span>
  </label>
</template>
<script lang="ts" setup>
defineProps<{
  modelValue: boolean;
}>();
defineEmits<{
  (name: "update:modelValue", v: boolean): void;
}>();
</script>
<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(19px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 9999px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
