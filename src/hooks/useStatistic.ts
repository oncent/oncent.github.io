import { BillType } from "@/data/bill";
import { getCategoryById } from "@/data/category";
import { t } from "@/locale";
import { mergeMap } from "@/utils/merge";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { isTimeMatched, useBills } from "./useBills";
import type { User } from "./useUser";

const { list } = useBills();

export type BillStatistic = Map<
  string,
  {
    expenses: Map<string, number>;
    income: Map<string, number>;
    expenseCategories: Map<string, number>;
    incomeCategories: Map<string, number>;
    sum: Map<string, number>;
  }
>;

export const statisticTypes = ["income", "expenses", "sum"] as const;

export type StatisticType = typeof statisticTypes[number];

export const useStatistic = (
  start: Ref<Dayjs | undefined>,
  end: Ref<Dayjs | undefined>
) => {
  const rangedList = computed(() =>
    list.value.filter((bill) => isTimeMatched(bill, start.value, end.value))
  );
  const statistic = computed(() => {
    const map: BillStatistic = new Map(); //eg. "user-xxx":{expense:xxx, income:xxx, categoroes:xxx}
    rangedList.value.forEach((bill) => {
      const date = dayjs.unix(bill.time).format("YYYY-MM-DD");
      const userStat = (() => {
        if (!map.has(bill.creatorId)) {
          map.set(bill.creatorId, {
            expenses: new Map<string, number>(), // eg. "2022-01-1":99
            income: new Map<string, number>(), // eg. "2022-02-01":78
            sum: new Map<string, number>(), // eg. "2022-03-01":2000
            incomeCategories: new Map<string, number>(), // eg. "Wage":2000
            expenseCategories: new Map<string, number>(), // eg. "Shopping":2000
          });
        }
        const umap = map.get(bill.creatorId)!;
        return umap;
      })();
      const lineMap =
        bill.type == BillType.Expenses ? userStat.expenses : userStat.income;
      lineMap.set(date, (lineMap.get(date) ?? 0) + bill.money);
      const pieMap = BillType.Expenses
        ? userStat.expenseCategories
        : userStat.incomeCategories;
      pieMap.set(
        bill.categoryId,
        (pieMap.get(bill.categoryId) ?? 0) + bill.money
      );
    });
    return map;
  });
  return statistic;
};

export const transformToPieData = (
  statistic: BillStatistic,
  users: User[],
  type: StatisticType
) => {
  const maps = users
    .filter((u) => statistic.has(u.id))
    .map((u) => {
      switch (type) {
        case "expenses":
          return statistic.get(u.id)!.expenseCategories;
        case "income":
          return statistic.get(u.id)!.incomeCategories;
        case "sum":
          return [
            statistic.get(u.id)!.expenseCategories,
            statistic.get(u.id)!.incomeCategories,
          ];
        default:
          return statistic.get(u.id)!.expenseCategories;
      }
    })
    .flat();
  const merged = mergeMap(...maps);
  return [...merged.entries()].map(([k, v]) => {
    const cate = getCategoryById(k)!;
    return {
      total: v,
      name: cate.name,
      category: t(cate.name),
    };
  });
};

export const transformToLineData = (
  statistic: BillStatistic,
  users: User[],
  type: StatisticType
) => {
  const mps = users
    .filter((u) => statistic.has(u.id))
    .map((u) => statistic.get(u.id)!);
  const dates = [...new Set(mps.map((mp) => [...mp[type].keys()]).flat())];
  const values = mps.map((mp) => [...mp[type].values()]);
  return {
    dates,
    values,
  };
};
