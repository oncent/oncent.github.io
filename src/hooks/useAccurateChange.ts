import type { Ref } from "vue";

export const useAccurateChange = (
  refs: Ref<HTMLInputElement | undefined>[],
  onChange: () => void
) => {
  let focused = false;
  onMounted(() => {
    const onFocus = () => {
      focused = true;
      nextTick(() => {
        focused = true;
      });
    };
    const onBlur = () => {
      focused = false;
    };
    const onChangeFn = () => {
      setTimeout(() => {
        if (!focused) {
          onChange();
        }
      }, 0);
    };
    refs.forEach((el) => {
      el.value?.addEventListener("focus", onFocus, { capture: true });
      el.value?.addEventListener("blur", onBlur, { capture: true });
      el.value?.addEventListener("blur", onChangeFn);
    });
    onUnmounted(() => {
      refs.forEach((el) => {
        el.value?.removeEventListener("focus", onFocus, { capture: true });
        el.value?.removeEventListener("blur", onBlur, { capture: true });
        el.value?.removeEventListener("blur", onChangeFn);
      });
    });
  });
};
