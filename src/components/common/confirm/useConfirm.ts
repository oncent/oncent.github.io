import { ref } from "vue";

import type { Controller } from "./ConfirmProvider.vue";

export type Confirm = ({
  icon,
  title,
  cancelTitle,
  confirmTitle,
  hideCancelButton,
}: Omit<Controller, "close" | "visible">) => Promise<void>;

const defaultController = () => ({
  visible: false,
  icon: "dialog-question",
  title: "",
  cancelTitle: undefined,
  confirmTitle: undefined,
  hideCancelButton: false,
  close: () => undefined,
});

export const useConfirm = () => {
  const controller = ref<Controller>(defaultController());
  const show = (params: Partial<Omit<Controller, "close" | "visible">>) =>
    new Promise<void>((res, rej) => {
      controller.value = {
        ...defaultController(),
        ...params,
        visible: true,
        close: (isConfirm: boolean) => {
          controller.value = { ...controller.value, visible: false };
          if (isConfirm) {
            res();
          } else {
            rej();
          }
        },
      };
    });
  return { show, controller };
};
