import type { Ref } from "vue";

export const useLimitedMultiSelect = <T = any>(mv: Ref<T[]>, lst: Ref<T[]>) => {
  mv.value = lst.value;
  const stop = watch(
    () => lst.value.length,
    (l) => {
      if (l > 0) {
        mv.value = lst.value;
        stop();
      }
    }
  );
  watch(
    () => mv.value,
    (n, o) => {
      if (n.length === 0) {
        if (o.length === 1) {
          mv.value = [o[0]];
        } else {
          mv.value = [lst.value[0]];
        }
      }
    }
  );
};
