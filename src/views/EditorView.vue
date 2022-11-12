<template>
  <div class="w-full h-full flex flex-col justify-between">
    <div class="header flex pt-2">
      <div class="flex buttoned rounded-full py-1 px-3" @click="goBack">
        <div class="flex items-center justify-center">
          <i class="icon-chevron-left"></i>
        </div>
        {{ $t("back") }}
      </div>
    </div>
    <div class="w-full min-h-20 rounded-lg flex p-2 pb-0">
      <div class="text-white">
        <bill-switch v-model="type"></bill-switch>
      </div>
      <div
        class="flex-1 flex flex-col justify-center items-end bg-stone-400 rounded-lg ml-2 p-2 overflow-x-scroll"
      >
        <!-- <div>{{ result.text }}</div>
        <div
          class="custom-input-wrapper h-12 text-4xl font-semibold pr-1.5"
          :class="{ focus: numpadVisible }"
        >
          {{ result.value }}
        </div> -->
        <input
          ref="moneyInput"
          v-model="result"
          v-autofocus
          inputmode="decimal"
          placeholder="0"
          type="number"
          class="text-white text-4xl font-semibold focus:(border-none outline-none) text-right bg-transparent appearance-remove-all placeholder-white placeholder-opacity-50"
        />
      </div>
    </div>
    <div class="sm:flex-1 flex-shrink-0 min-h-100px overflow-y-auto my-2 px-2">
      <div class="flex flex-wrap justify-between">
        <div
          v-for="item in categories"
          :key="item.id"
          class="rounded-lg bg-stone-200 border text-stone-700 flex-1 py-1 px-2 my-1 mr-1 h-8 flex items-center justify-center whitespace-nowrap cursor-pointer"
          :class="{ 'bg-gray-600 text-light-900': cateId === item.id }"
          @mousedown="chooseCategory($event, item.id)"
        >
          <i class="icon-xs" :class="[item.icon]"></i>
          <div class="mx-2">{{ $t(item.name) }}</div>
        </div>
      </div>
    </div>
    <div
      class="keyboard-field <sm:(flex-1) flex flex-col justify-start bg-stone-900 rounded-b-lg text-[white] p-2"
    >
      <div class="mb-1 flex justify-between items-center p-2">
        <div class="flex items-center">
          <div
            class="mx-1 p-2 flex justify-center items-center rounded-full transition-all hover:(bg-stone-700) active:(bg-stone-500)"
            @click="chooseImage"
          >
            <i v-if="!image" class="icon-xs icon-image text-[white]"></i>
            <img
              v-else
              :src="image.url"
              alt=""
              class="w-6 h-6 object-cover rounded"
            />
          </div>
          <!-- <div
            class="mx-1 p-2 flex justify-center items-center rounded-full transition-all hover:(bg-stone-700) active:(bg-stone-500)">
            <i class="icon-xs icon-flag text-[white]"></i>
          </div> -->
          <div
            class="p-2 rounded-full transition-all hover:(bg-stone-700) active:(bg-stone-500)"
          >
            <date-time v-model="time"></date-time>
          </div>
        </div>
        <div class="flex h-full flex-1">
          <input
            ref="commentInputEl"
            v-model="comment"
            type="text"
            class="w-full bg-transparent text-white text-right placeholder-opacity-50 focus:(border-none outline-none)"
            :placeholder="$t('comment')"
            enterkeyhint="done"
            @keypress="onCommentKeyPress"
          />
        </div>
      </div>
      <!-- <number-pad
        :init-value="result.value"
        :class="{
          '<sm:(opacity-0 pointer-events-none)': !numpadVisible,
        }"
        @back="goBack"
        @change="onNumpadChange"
        @confirm="onConfirm"
      ></number-pad> -->
      <button
        class="flex h-80px justify-center items-center bg-green-700 rounded-lg m-2 font-bold text-lg cursor-pointer"
        @click="onConfirm"
      >
        <i class="icon-check icon-md"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { clear, useEditor } from "@/hooks/useEditor";
import BillSwitch from "@/components/BillSwitch.vue";
import DateTime from "@/components/common/DateTime.vue";
import { vAutofocus } from "@/directives/autofocus";
import { showFilePicker, FORMAT_IMAGE_SUPPORTED } from "@/utils/file";
import { useAccurateChange } from "@/hooks/useAccurateChange";
// import type { NumpadResult } from "@/utils/numpad";
// import NumberPad from "@/components/common/NumberPad.vue";
// const numpadVisible = ref(true);
// const onNumpadChange = (v: NumpadResult) => {
//   result.value = v;
// };

const router = useRouter();
const {
  type,
  time,
  cateId,
  categories,
  comment,
  result,
  image,
  onConfirm,
  goBack,
  chooseImage,
} = useEditor(router);

const moneyInput = ref<HTMLInputElement>();
const chooseCategory = (e: MouseEvent, id: string) => {
  e.preventDefault();
  cateId.value = id;
};

onBeforeUnmount(() => {
  clear();
});

const commentInputEl = ref<HTMLInputElement>();
useAccurateChange([moneyInput, commentInputEl], () => {
  onConfirm();
});
const onCommentKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    onConfirm();
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/animation.scss";

@include splash();

.custom-input-wrapper.focus {
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 1px;
    height: 95%;
    position: absolute;
    background-color: black;
    right: 2px;
    animation: splash infinite 1.4s;
  }
}

.keyboard-field {
  // padding-bottom: calc(0.5rem + env(safe-area-inset-bottom) + 40%);
}
</style>
