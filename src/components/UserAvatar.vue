<template>
  <div
    class="avatar flex bg-black text-white"
    :class="{ avatar: true, editable }"
    @click="toEdit()"
  >
    <div class="name" v-if="!editing">{{ name }}</div>
    <input
      v-else
      class="editor"
      ref="input"
      type="text"
      :value="name"
      @blur="onBlur()"
    />
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    name: string;
    editable?: boolean;
    bgColor?: string;
    size?: string;
  }>(),
  {
    bgColor: "#000000",
    size: `80px`,
  }
);

const emit = defineEmits<{
  (name: "update:name", value: string): void;
}>();
const input = ref<HTMLInputElement>();
const shouldEdit = ref(false);
const editing = computed({
  get: () => (props.editable ? shouldEdit.value : false),
  set: (v) => {
    shouldEdit.value = v;
  },
});
const toEdit = () => {
  if (!props.editable) return;
  editing.value = true;
  nextTick(() => {
    input.value?.focus();
  });
};

const onBlur = () => {
  editing.value = false;
  const newName = input.value?.value;
  if (newName !== undefined && newName !== props.name) {
    emit("update:name", newName);
  }
};
</script>
<style lang="scss" scoped>
$width: 80px;
.avatar {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover,
  &:focus-within {
    width: calc(v-bind(size) * 2);
    padding: 0 25px;
    cursor: pointer;
  }
  .editor {
    border: none;
    outline: none;
    background: none;
    width: 100%;
    font-size: 16px;
    color: white;
  }
  .name {
    // width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    margin: 5px;
  }
}
</style>
