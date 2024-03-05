export enum BillType {
  Income,
  Expenses,
}

export type BillCategory = {
  type: BillType;
  name: string;
  id: string;
  icon: string;
  color: string;
  pieColor: string;
};

export type Bill = {
  type: BillType;
  categoryId: string;
  comment: string;
  money: number;
  time: number;
  image?: Blob|ArrayBuffer;
  location?: string;
  id: string;
  creatorId: string;
};
