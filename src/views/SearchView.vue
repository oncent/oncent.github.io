<template>
  <div class="w-full h-full flex justify-center">
    <div class="h-full w-full mx-2 max-w-[600px] flex flex-col">
      <div class="search w-full flex justify-center pt-4">
        <div
          class="w-full h-10 shadow-md rounded-sm flex items-center px-4 focus-within:(shadow-lg)"
        >
          <div class="flex-1">
            <Clearable
              :visible="searchText.length > 0"
              @clear="searchText = ''"
            >
              <input
                v-model="searchText"
                type="text"
                class="w-full bg-transparent focus:(border-none outline-none)"
              />
            </Clearable>
          </div>
          <div class="buttoned p-3 rounded-full" @click="search">
            <i class="icon-search"></i>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col overflow-hidden">
        <BillFilter v-model="filter"></BillFilter>
        <div class="text-sm text-gray-500">
          {{ $t("total") }}: {{ list.length }}
        </div>
        <div class="flex-1 divide-y overflow-y-auto">
          <List
            :list="list"
            value-key="id"
            :get-range-height="getRangeHeight"
            :footer-height="96"
          >
            <template #default="{ item }">
              <div
                class="bill-item flex justify-between items-center px-4 py-4 buttoned cursor-pointer"
                @click="show(item)"
              >
                <div class="flex items-center">
                  <div
                    class="bg-white border w-10 h-10 flex items-center justify-center"
                  >
                    <i :class="[getCategoryById(item.categoryId)?.icon]"></i>
                  </div>
                  <div class="flex flex-col px-4">
                    <div class="flex text-md font-semibold">
                      <div>{{ getCategoryById(item.categoryId)?.name }}</div>
                    </div>
                    <div class="flex text-xs">
                      <div>
                        {{
                          getUserName(item.creatorId)?.name ?? "unknown user"
                        }}
                      </div>
                      <template v-if="item.comment">
                        <div class="px-1">|</div>
                        <div>{{ item.comment }}</div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="text-lg font-bold">{{ item.money }}</div>
              </div>
            </template>
          </List>
        </div>
      </div>
    </div>
    <BillInfo
      :controller="controller"
      @delete="removeItem"
      @edit="toEdit"
    ></BillInfo>
  </div>
</template>
<script setup lang="ts">
import { isBillMatched, remove, searchBills } from "@/hooks/useBills";
import BillFilter, { type FilterProp } from "@/components/BillFilter.vue";
import BillInfo from "@/components/BillInfo.vue";

import { getCategoryById } from "@/data/category";
import type { Bill } from "@/data/bill";
import { useBillInfo } from "@/hooks/useBillInfo";
import { showEditor } from "@/hooks/useEditor";
import { getUserName } from "@/hooks/useUser";
import Clearable from "../components/common/Clearable.vue";
import List from "@/components/common/List.vue";

const searchText = ref("");
const list = ref<Bill[]>([]);
const filter = ref<FilterProp>();

const search = async () => {
  if (!searchText.value || !filter.value) {
    list.value = [];
    return;
  }
  const fp = filter.value;
  list.value = await searchBills((tb) =>
    tb.filter((b) => isBillMatched(b, { ...fp, comment: searchText.value }))
  );
};

const getRangeHeight = (start: number, length: number) => {
  const itemH = 72;
  const end = Math.min(list.value.length, start + length);
  const itemCount = end - start;
  return itemH * itemCount;
};

const { show, controller } = useBillInfo();
const router = useRouter();
const toEdit = (info: Bill) => {
  showEditor("edit", info, router);
};
const removeItem = (id: string) => {
  remove(id);
};
</script>
