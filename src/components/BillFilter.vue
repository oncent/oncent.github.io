<template>
  <div class="pt-4 pb-2">
    <div class="filter-field transition-all rounded" :class="[
      expended ? 'h-[252px] opacity-100' : 'h-0 overflow-hidden opacity-0',
    ]">
      <div class="flex justify-between py-2">
        <div class="flex-1 flex justify-between">
          <div class="flex">
            <Clearable :visible="true" class="rounded-full shadow px-2 buttoned truncate py-2"
              @clear="start = dayjs.unix(-Infinity)">
              <DateTime v-model="start" :display-formatter="displayStartDateFormatter">
                <template #icon>
                  <div>{{ $t("from") }}:</div>
                </template>
              </DateTime>
            </Clearable>
          </div>
          <div>
            <Clearable :visible="true" class="rounded-full shadow px-2 buttoned truncate py-2"
              @clear="end = dayjs.unix(Infinity)">
              <DateTime v-model="end" :display-formatter="displayEndDateFormatter">

                <template #icon>
                  <div>{{ $t("to") }}:</div>
                </template>
              </DateTime>
            </Clearable>
          </div>
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div class="flex items-center px-2">
          <div class="w-6 flex justify-center">
            <i class="icon-align-middle icon-xs"></i>
          </div>
          <div class="px-2">{{ $t("type") }}:</div>
        </div>
        <div class="flex rounded-full shadow overflow-hidden">
          <div class="w-80px text-center buttoned py-1"
            :class="{ '!bg-stone-700 !text-white': type === BillType.Income }" @click="onChangeType(BillType.Income)">
            {{ $t("income") }}
          </div>
          <div class="w-80px text-center buttoned py-1"
            :class="{ '!bg-stone-700 !text-white': type === BillType.Expenses }" @click="onChangeType(BillType.Expenses)">
            {{ $t("expenses") }}
          </div>
          <div class="w-80px text-center buttoned py-1" :class="{ '!bg-stone-700 !text-white': type === undefined }"
            @click="onChangeType(undefined)">
            {{ $t("all") }}
          </div>
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div class="flex items-center px-2">
          <div class="w-6 flex justify-center">
            <i class="icon-credit-card icon-xs"></i>
          </div>
          <div class="px-2 whitespace-nowrap">{{ $t("range") }}:</div>
        </div>
        <div class="flex">
          <div class="rounded-full shadow px-2 buttoned mx-2 flex items-center">
            <Clearable :visible="true" @clear="min = -Infinity">
              <input v-if="min !== -Infinity" v-model="min" type="number"
                class="max-w-50px bg-transparent focus:(border-none outline-none) text-right py-1"
                inputmode="decimal" />
              <div v-else class="py-1" @click="min = 0">
                {{ $t("unlimited") }}
              </div>
            </Clearable>
          </div>
          <div class="px-2">-</div>
          <div class="rounded-full shadow px-2 buttoned mx-2">
            <Clearable :visible="true" @clear="max = Infinity">
              <input v-if="max !== Infinity" v-model="max" type="number"
                class="max-w-50px bg-transparent focus:(border-none outline-none) text-right py-1"
                inputmode="decimal" />
              <div v-else class="py-1" @click="max = 0">
                {{ $t("unlimited") }}
              </div>
            </Clearable>
          </div>
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div class="flex items-center px-2">
          <div class="w-6 flex justify-center">
            <i class="icon-user-list icon-xs"></i>
          </div>
          <div class="px-2">{{ $t("users") }}:</div>
        </div>
        <div class="flex">
          <Select v-model="selectedUsers" :list="allUsers" multiple value-key="id">

            <template #default="{ allSelected }">
              <div class="shadow buttoned px-4 max-w-[160px] rounded-full h-full truncate mx-2 py-1">
                {{
      allSelected
        ? $t("all")
        : selectedUsers.length === 0
          ? "None"
          : selectedUsers.map((c) => c.name).join(",")
    }}
              </div>
            </template>
          </Select>
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div class="flex items-center px-2">
          <div class="w-6 flex justify-center">
            <i class="icon-carousel icon-xs"></i>
          </div>
          <div class="px-2">{{ $t("categories") }}:</div>
        </div>
        <div class="flex">
          <Select v-model="selectedCategories" :list="billCategories" multiple value-key="id">

            <template #default="{ allSelected }">
              <div class="shadow buttoned px-4 max-w-[160px] rounded-full h-full truncate mx-2 py-1">
                {{
      allSelected
        ? $t("all")
        : selectedCategories.length === 0
          ? $t("none")
          : selectedCategories.map((c) => $t(c.name)).join(",")
    }}
              </div>
            </template>

            <template #option="{ item, selected, select }">
              <div class="p-2 buttoned flex items-center" :class="{ '!bg-gray-700 text-white': selected }">
                <div class="w-8 flex justify-center">
                  <i :class="[item.icon]"></i>
                </div>
                <div class="mx-2">
                  {{ $t(item.name) }}
                </div>
              </div>
            </template>
          </Select>
        </div>
      </div>
    </div>
    <div class="flex justify-between py-2" :class="{ 'border-t': expended }">
      <div>
        <div class="buttoned rounded-sm px-2 text-gray-600" :class="{ 'opacity-0 pointer-events-none': !expended }"
          @click="reset">
          {{ $t("reset") }}
        </div>
      </div>
      <div class="flex items-center rounded-sm buttoned px-2" @click="()=>toggleExpand()">
        <div>
          <i class="icon-play-list-search"></i>
        </div>
        <div class="px-2">{{ $t("filter") }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BillType } from "@/data/bill";
import Select from "@/components/common/Select.vue";
import Clearable from "./common/Clearable.vue";
import DateTime from "./common/DateTime.vue";
import dayjs, { Dayjs } from "dayjs";
import { t } from "@/locale";
import { useFilterForm } from "@/hooks/useFilter";

export type FilterProp = {
  start?: Dayjs;
  end?: Dayjs;
  max?: number;
  min?: number;
  type?: BillType;
  users: string[];
  categories: string[];
};

const props = defineProps<{
  filter?: FilterProp;
}>();
const emit = defineEmits<{
  (name: "update:modelValue", value: FilterProp): void;
}>();

const expended = ref(Boolean(props.filter));
const toggleExpand = (v?: boolean) => {
  if (v !== undefined) {
    expended.value = v;
    return
  }
  expended.value = !expended.value;
};

const displayStartDateFormatter = (d: Dayjs) => {
  if (!d.isValid()) return t("early");
  return d.format("YYYY-MM-DD");
};
const displayEndDateFormatter = (d: Dayjs) => {
  if (!d.isValid()) return t("later");
  return d.format("YYYY-MM-DD");
};

const {
  start,
  end,
  min,
  max,
  type,
  selectedUsers,
  selectedCategories,
  allUsers,
  billCategories,

  getFilter,
  setFilter,
  reset,
} = useFilterForm(props.filter);

const onChangeType = (t?: BillType) => {
  type.value = t;
  selectedCategories.value = [...billCategories.value];
}

// watchEffect(() => {
//   emit("update:modelValue", {
//     start: start.value?.isValid() ? start.value : undefined,
//     end: end.value?.isValid() ? end.value : undefined,
//     max: max.value,
//     min: min.value,
//     type: type.value,
//     users: selectedUsers.value.map((u) => u.id),
//     categories: selectedCategories.value.map((c) => c.id),
//   });
// });


defineExpose({
  getFilter,
  setFilter,
  toggleExpand
});
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
// hide input arrows
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
