import { BillType, type Bill } from "@/data/bill";
import { BillCategories } from "@/data/category";
import { db } from "@/data/db";
import { addBill } from "@/hooks/useBills";
import { useUser } from "@/hooks/useUser";
import { v4 } from "uuid";

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const randomItem = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const addRandomTestData = () => {
  const { userInfo } = useUser();
  setTimeout(() => {
    const createBill = (m: number) => {
      const date = randomDate(new Date("2020-01-02"), new Date("2023-01-02"));
      const type = randomItem([BillType.Expenses, BillType.Income]);
      const cate = randomItem(BillCategories.filter((x) => x.type === type));
      return {
        time: date.getTime() / 1000,
        name: `Test-${date.toLocaleString()}`,
        categoryId: cate.id,
        creatorId: userInfo.value.id,
        type,
        comment: `test comment ${date.toLocaleString()}`,
        money: m,
        id: v4(),
      } as Bill;
    };
    Array.from({ length: 200 }, () => 0).forEach((_, i) => {
      const bill = createBill(i);
      addBill(bill);
    });
  }, 1000);
};

export const addTestData = () => {
  const { userInfo } = useUser();

  setTimeout(() => {
    console.log(userInfo.value);
    const createBill = (i: number) => {
      const date = new Date("2020/01/02");
      const type = randomItem([BillType.Expenses, BillType.Income]);
      const cate = randomItem(BillCategories.filter((x) => x.type === type));
      return {
        time: (date.getTime() + i) / 1000,
        name: `Test-${date.toLocaleString()}`,
        categoryId: cate.id,
        creatorId: userInfo.value.id,
        type,
        comment: `test comment ${date.toLocaleString()}`,
        money: i,
        id: v4(),
      } as Bill;
    };
    Array.from({ length: 3000 }, () => 0).forEach((_, i) => {
      const bill = createBill(i);
      addBill(bill);
    });
  }, 1000);
};

export const intervalAdd = () => {
  const { userInfo } = useUser();
  setInterval(() => {
    const createBill = (m: number) => {
      const date = randomDate(new Date("2020/01/02"), new Date("2023/01/02"));
      const type = randomItem([BillType.Expenses, BillType.Income]);
      const cate = randomItem(BillCategories.filter((x) => x.type === type));
      return {
        time: date.getTime() / 1000,
        name: `Test-${date.toLocaleString()}`,
        categoryId: cate.id,
        creatorId: userInfo.value.id,
        type,
        comment: `test comment ${date.toLocaleString()}`,
        money: m,
        id: v4(),
      } as Bill;
    };
    db.tables.forEach((tb) => {
      if (!["bills", "names"].includes(tb.name)) {
        tb.add(createBill(0));
      }
    });
  }, 1000);
};
