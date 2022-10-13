import { useWindowSize } from "@vueuse/core";

const SM = 640;

export const useMobile = () =>
  computed(() => useWindowSize().width.value <= SM);
