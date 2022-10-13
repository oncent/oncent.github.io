import type { FilterProp } from "@/components/BillFilter.vue";
import { BillType, type Bill } from "@/data/bill";
import { db } from "@/data/db";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  liveQuery,
  type Collection,
  type IndexableType,
  type Table,
} from "dexie";
import { v4 } from "uuid";
import type { Ref } from "vue";
import { useUser } from "./useUser";

type BillToAdd = Omit<Bill, "id" | "creatorId">;

type BillToEdit = Partial<Omit<Bill, "id">>;

export type BillFilter = (
  store: Table<Bill, IndexableType>
) => Collection<Bill, IndexableType>;

const { userInfo } = useUser();

export const add = (bill: BillToAdd) =>
  db.bills.add({ ...bill, id: v4(), creatorId: userInfo.value.id });

export const remove = async (billId: string) => {
  await db.bills.delete(billId);
  await db.deletedBills.add({ id: billId });
};

export const edit = async (billId: string, newBill: BillToEdit) => {
  const oldBill = await db.bills.get(billId);
  if (oldBill) {
    return db.bills.put({ ...oldBill, ...newBill }, billId);
  }
};

export const useBills = (filter?: Ref<BillFilter | undefined> | BillFilter) => {
  const list = ref<Bill[]>([]);

  liveQuery(async () => {
    const flt: BillFilter = (() => {
      const df: BillFilter = (tb) => tb.orderBy("time").reverse();
      if (filter === undefined || typeof filter === "function") {
        return df;
      }
      return filter.value ?? df;
    })();
    return await flt(db.bills).toArray();
  }).subscribe((v) => {
    list.value = v as any;
  });

  return {
    list,
  };
};

export const searchBills = async (filter: BillFilter) => {
  return await filter(db.bills).toArray();
};

const isTypeMatched = (bill: Bill, type?: BillType) => {
  if (type === undefined) return true;
  return [BillType.Expenses, BillType.Income].includes(bill.type);
};

const isTimeMatched = (bill: Bill, start?: Dayjs, end?: Dayjs) => {
  const d = dayjs.unix(bill.time);
  if (start) {
    if (end) {
      return d.isAfter(start) && d.isBefore(end);
    }
    return d.isAfter(start);
  }
  if (end) {
    return d.isBefore(end);
  }
  return true;
};

const isMoneyMatched = (bill: Bill, min = -Infinity, max = Infinity) => {
  return bill.money <= max && bill.money >= min;
};
const isUserMatched = (bill: Bill, uids: string[]) => {
  return uids.some((u) => bill.creatorId === u);
};
const isCateMatched = (bill: Bill, cates: string[]) => {
  return cates.some((c) => bill.categoryId === c);
};

const isCommentMatched = (bill: Bill, comment?: string) => {
  return Boolean(comment && bill.comment.includes(comment));
};
export const isBillMatched = (
  bill: Bill,
  filterProp: FilterProp & { comment?: string }
) => {
  return (
    isTypeMatched(bill, filterProp.type) &&
    isUserMatched(bill, filterProp.users) &&
    isCateMatched(bill, filterProp.categories) &&
    isMoneyMatched(bill, filterProp.min, filterProp.max) &&
    isTimeMatched(bill, filterProp.start, filterProp.end) &&
    isCommentMatched(bill, filterProp.comment)
  );
};
