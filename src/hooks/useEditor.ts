import { MessageType, showMessage } from "@/components/common/message";
import { BillType, type Bill } from "@/data/bill";
import { BillCategories } from "@/data/category";
import { showFilePicker, FORMAT_IMAGE_SUPPORTED } from "@/utils/file";
import dayjs, { Dayjs } from "dayjs";
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
  const time = ref<Dayjs>();
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

  const image = ref<{ url: string; file: File | Blob | ArrayBuffer }>();
  const chooseImage = async () => {
    const [imageFile] = await showFilePicker({
      accept: FORMAT_IMAGE_SUPPORTED,
      multiple: false,
    });
    const url = URL.createObjectURL(imageFile);
    if (image.value) {
      URL.revokeObjectURL(image.value.url);
    }
    image.value = {
      url,
      file: imageFile,
    };
  };

  if (initMode.value === "edit") {
    type.value = initBill.value?.type ?? type.value;
    time.value =
      (initBill.value?.time ? dayjs.unix(initBill.value?.time) : undefined) ??
      time.value;
    cateId.value = initBill.value?.categoryId ?? cateId.value;
    result.value =
      initBill.value?.money !== undefined ? initBill.value.money : result.value;
    comment.value = initBill.value?.comment ?? comment.value;
    if (initBill.value?.image) {
      const url =
        initBill.value.image instanceof Blob
          ? URL.createObjectURL(initBill.value.image)
          : URL.createObjectURL(new Blob([initBill.value.image]));
      image.value = {
        file: initBill.value.image,
        url,
      };
    }
  }

  const goBack = () => {
    router.back();
  };

  const onConfirm = async () => {
    const getNewBill = () => ({
      type: type.value,
      time: time.value!.unix(),
      categoryId: cateId.value,
      money: Number(result.value),
      comment: comment.value,
      image: image.value?.file,
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
    image,
    onConfirm,
    goBack,
    chooseImage,
  };
};
