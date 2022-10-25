<template>
  <CustomDialog
    :visible="controller.visible"
    close-on-modal
    custom-class="bill-info-dialog"
    @update:visible="(v) => controller.set('visible', v)"
  >
    <div v-if="controller.info" class="min-h-[300px] p-4 flex flex-col w-full h-full">
      <div class="flex-1 flex flex-col">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="rounded-full bg-white border p-4">
              <i
                class="icon-md"
                :class="[getCategoryById(controller.info.categoryId)?.icon]"
              ></i>
            </div>
            <div class="flex text-md font-semibold mx-2">
              <div>
                {{
                  $t(getCategoryById(controller.info.categoryId)?.name as any)
                }}
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold overflow-x-auto">
            {{ controller.info.money }}
          </div>
        </div>
        <div class="w-full border border-dashed my-2"></div>
        <div class="text-gray-500">
          <div class="flex justify-between items-center my-1">
            <div>{{ $t("comment") }}:</div>
            <div class="flex-1 overflow-x-auto text-right">
              {{ controller.info.comment }}
            </div>
          </div>
          <div class="flex justify-between items-center my-1">
            <div>{{ $t("creator") }}:</div>
            <div>{{ userName }}</div>
          </div>
          <div class="flex justify-between items-center my-1">
            <div>{{ $t("time") }}:</div>
            <div>{{ formatTime(controller.info.time) }}</div>
          </div>
        </div>
        <div v-if="controller.info.image" class="flex-1 py-2 flex items-center justify-center">
          <img :src="blobToUrl(controller.info.image)" alt="" class="object-contain rounded">
        </div>
      </div>
      <div class="footer flex justify-between items-center">
        <div class="flex">
          <div
            v-if="props.controller.info?.creatorId === userInfo.id"
            class="buttoned px-2 rounded-md text-red-600"
            @click="toDelete"
          >
            {{ $t("delete") }}
          </div>
        </div>
        <div class="flex">
          <div class="buttoned px-2 rounded-md" @click="close">
            {{ $t("cancel") }}
          </div>
          <div
            v-if="props.controller.info?.creatorId === userInfo.id"
            class="buttoned ml-2 px-2 rounded-md font-semibold"
            @click="toEdit"
          >
            {{ $t("edit") }}
          </div>
        </div>
      </div>
    </div>
  </CustomDialog>
</template>
<script lang="ts" setup>
import CustomDialog from "@/components/common/Dialog.vue";
import type { Bill } from "@/data/bill";
import { getCategoryById } from "@/data/category";
import { useUser } from "@/hooks/useUser";
import { showEditor } from "@/hooks/useEditor";
import dayjs from "dayjs";
import { removeBill } from "@/hooks/useBills";

export type Controller = {
  info?: Bill;
  visible: boolean;
  set: (k: string, v: any) => void;
};

const props = defineProps<{
  controller: Controller;
}>();

const emit = defineEmits<{
  (name: "delete", value: string): void;
  (name: "edit", value: Bill): void;
}>();

const formatTime = (t: number) => dayjs.unix(t).format("YYYY-MM-DD HH:mm");

const { allUsers, userInfo } = useUser();
const userName = computed(
  () =>
    allUsers.value.find((u) => u.id === props.controller.info?.creatorId)
      ?.name ?? "unknown user"
);

const close = () => {
  props.controller.set("visible", false);
};

const toDelete = () => {
  if (props.controller.info) {
    removeBill(props.controller.info.id);
    emit("delete", props.controller.info.id);
  }
  close();
};

const router = useRouter();
const toEdit = () => {
  if (props.controller.info) {
    showEditor("edit", props.controller.info, router);
    emit("edit", props.controller.info);
  }
  close();
};

const blobToUrl=(blob:Blob|ArrayBuffer)=>{
  return URL.createObjectURL(new Blob([blob]))
}
</script>
<style lang="scss">
.bill-info-dialog {
  .dialog-body {
    @apply w-[90%] max-w-[400px];
  }
}
</style>
