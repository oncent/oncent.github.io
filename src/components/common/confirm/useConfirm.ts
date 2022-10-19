import { ref } from "vue";

export type Controller = {
  visible: boolean;
  icon?: string;
  title: string;
  confirmTitle?: string;
  cancelTitle?: string;
  hideCancelButton?: boolean;
  close: (isConfirm: boolean) => void;
};

export type Confirm = ({
  icon,
  title,
  cancelTitle,
  confirmTitle,
  hideCancelButton,
}: Omit<Controller, "close" | "visible">) => Promise<void>;

export const useConfirm = () => {
  const defaultController = {
    visible: false,
    icon: "dialog-question",
    title: "",
    cancelTitle: "No",
    confirmTitle: "Yes",
    hideCancelButton: false,
    close: () => undefined,
  };
  const controller = ref<Controller>(defaultController);
  const show = (params: Partial<Omit<Controller, "close" | "visible">>) =>
    new Promise<void>((res, rej) => {
      controller.value = {
        ...defaultController,
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
