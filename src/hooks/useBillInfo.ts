import type { Bill } from "@/data/bill";

const controller = reactive({
  info: undefined as Bill | undefined,
  visible: false,
  set: (k: string, v: any) => {
    if (k === "visible") {
      controller.visible = v;
    }
  },
});

const show = (bill: Readonly<Bill>) => {
  controller.info = bill;
  controller.visible = true;
};
export const useBillInfo = () => {
  return { show, controller };
};
