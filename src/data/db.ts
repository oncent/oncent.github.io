import type { User } from "@/hooks/useUser";
import Dexie, { type Table } from "dexie";
import type { Bill } from "./bill";

class Records {
  static VERSION_NAME = "version";
  records: string[];
  get version() {
    return Number(localStorage.getItem(Records.VERSION_NAME) ?? "1");
  }
  set version(v: number) {
    localStorage.setItem(Records.VERSION_NAME, String(v));
  }

  static RECORDS_NAME = "records";
  constructor() {
    this.records = JSON.parse(
      localStorage.getItem(Records.RECORDS_NAME) ?? "[]"
    );
  }
  has(key: string) {
    return this.records.some((x) => x === key);
  }
  delete(key: string) {
    this.records = this.records.filter((x) => x !== key);
    localStorage.setItem(Records.RECORDS_NAME, JSON.stringify(this.records));
  }

  add(key: string) {
    if (!this.has(key)) {
      this.records.push(key);
      localStorage.setItem(Records.RECORDS_NAME, JSON.stringify(this.records));
    }
  }
}

const records = new Records();

const initialSchemas = {
  bills: "++id, comment, categoryId, time",
  users: "++id, nickname, name, me, connectId, latestTransferTime",
};

export class CustomDexie extends Dexie {
  bills!: Table<Bill>;
  users!: Table<User & { me?: boolean }>;

  constructor() {
    super("billDatabase");
    this.version(records.version).stores(this.getStoreSchemas());
  }

  async addNewBillTable(tableName: string, bills: Bill[]) {
    if (tableName === "bills" || tableName === "users")
      throw new Error("invalid table name");
    if (!records.has(tableName)) {
      records.add(tableName);
      await this.upgradeBills();
      await this.tables.find((tb) => tb.name === tableName)?.bulkAdd(bills);
      return;
    }
    const oldTb = this.tables.find((tb) => tb.name === tableName);
    await oldTb?.clear();
    await oldTb?.bulkAdd(bills);
  }

  async deleteBillTable(tableName: string) {
    if (tableName === "bills" || tableName === "users")
      throw new Error("invalid table name");
    if (records.has(tableName)) {
      records.delete(tableName);
      await this.upgradeBills({ [tableName]: null });
    }
  }

  getOtherBillDbs() {
    return [
      ...this.tables.filter((db) => records.has(db.name)),
    ] as Table<Bill>[];
  }

  private getStoreSchemas() {
    return {
      ...initialSchemas,
      ...Object.fromEntries(
        records.records.map((name) => [name, initialSchemas.bills])
      ),
    };
  }
  private async upgradeBills(extraSchemas?: Record<string, string | null>) {
    const newVerno = this.verno + 1;
    this.close();
    await new Promise((res) => setTimeout(res, 500));
    this.version(newVerno)
      .stores({ ...this.getStoreSchemas(), ...extraSchemas })
      .upgrade(() => undefined);
    await this.open();
    this.afterUpgradeFn?.();
    records.version = this.verno;
  }

  private afterUpgradeFn?: () => void;
  afterUpgrade(fn: () => void) {
    this.afterUpgradeFn = fn;
  }
}

export const db = new CustomDexie();
