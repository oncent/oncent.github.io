import { MessageType, showMessage } from "@/components/common/message";
import { BillType, type Bill } from "@/data/bill";
import { BillCategories } from "@/data/category";
import dayjs from "dayjs";
import type { Router } from "vue-router";
import { addBill, editBill } from "./useBills";

type Mode = "edit" | "add";

const initBill = ref<Partial<Bill>>();
const initMode = ref<Mode>("add");

export const showEditor = (
  mode: Mode = "add",
  info?: Partial<Bill>,
  router?: Router
) => {
  initBill.value = info;
  initMode.value = mode;
  router?.push("/edit");
};

export const clear = () => {
  initBill.value = undefined;
  initMode.value = "add";
};

export const useEditor = (router: Router) => {
  const type = ref<BillType>(BillType.Expenses);
  const time = ref<string>();
  const categories = computed(() =>
    BillCategories.filter((item) => item.type === type.value)
  );
  const cateId = ref(categories.value[0].id);
  // const result = ref<NumpadResult>({ value: 0, text: "0" });
  const result = ref<string | number>("");
  const comment = ref("");
  watchEffect(() => {
    cateId.value = categories.value[0].id;
  });

  if (initMode.value === "edit") {
    type.value = initBill.value?.type ?? type.value;
    time.value =
      (initBill.value?.time
        ? dayjs.unix(initBill.value?.time).toISOString()
        : undefined) ?? time.value;
    cateId.value = initBill.value?.categoryId ?? cateId.value;
    result.value =
      initBill.value?.money !== undefined ? initBill.value.money : result.value;
    comment.value = initBill.value?.comment ?? comment.value;
  }

  const goBack = () => {
    router.back();
  };

  const onConfirm = async () => {
    const getNewBill = () => ({
      type: type.value,
      time: dayjs(time.value).unix(),
      categoryId: cateId.value,
      money: Number(result.value),
      comment: comment.value,
    });
    const newBill = getNewBill();
    if (newBill.money < 0) {
      showMessage({
        type: MessageType.Error,
        content: "money can not be negative",
      });
      return;
    }
    if (initMode.value === "add") {
      await addBill(newBill);
      goBack();
      return;
    }
    if (initMode.value === "edit") {
      if (initBill.value?.id) {
        await editBill(initBill.value?.id, newBill);
        goBack();
      }
    }
  };
  return {
    time,
    type,
    categories,
    cateId,
    comment,
    result,
    onConfirm,
    goBack,
  };
};
