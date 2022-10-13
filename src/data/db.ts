import type { User } from "@/hooks/useUser";
import Dexie, { type Table } from "dexie";
import type { Bill } from "./bill";

export class CustomDexie extends Dexie {
  bills!: Table<Bill>;
  users!: Table<User & { me?: boolean }>;
  deletedBills!: Table<{ id: string }>;

  constructor() {
    super("billDatabase");
    this.version(1).stores({
      bills: "++id, comment, categoryId, time", // Primary key and indexed props
      users: "++id, nickname, name, me",
      deletedBills: "++id",
    });
  }
}

export const db = new CustomDexie();
