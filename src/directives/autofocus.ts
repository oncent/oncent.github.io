import type { Directive } from "vue";

export const vAutofocus: Directive = {
  mounted: (el: HTMLInputElement) => {
    el.focus();
  },
};
