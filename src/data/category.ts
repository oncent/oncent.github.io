import { BillType, type BillCategory } from "./bill";

export const ExpensesBillCategories: BillCategory[] = [{
  name: "Food",
  id: "food",
  type: BillType.Expenses,
  icon: "icon-bowl",
  color: "bg-red-600",
  pieColor: '#5470c6'
},
{
  name: "Transport",
  id: "transport",
  type: BillType.Expenses,
  icon: "icon-airplane",
  color: "bg-red-600",
  pieColor: '#91cc75'
},
{
  name: "Shopping",
  id: "shopping",
  type: BillType.Expenses,
  icon: "icon-shopping-cart",
  color: "bg-red-600",
  pieColor: '#fac858'
},
{
  name: "Housing",
  id: "housing",
  type: BillType.Expenses,
  icon: "icon-home-alt",
  color: "bg-red-600",
  pieColor: '#ee6666'
},
{
  name: "Entertainment",
  id: "entertainment",
  type: BillType.Expenses,
  icon: "icon-dice-3",
  color: "bg-red-600",
  pieColor: '#73c0de'
},
{
  name: "Medical",
  id: "medical",
  type: BillType.Expenses,
  icon: "icon-pill",
  color: "bg-red-600",
  pieColor: '#3ba272'
},
{
  name: "Education",
  id: "education",
  type: BillType.Expenses,
  icon: "icon-pen",
  color: "bg-red-600",
  pieColor: '#9a60b4'
},
{
  name: "Relationship",
  id: "relationship",
  type: BillType.Expenses,
  icon: "icon-gift",
  color: "bg-red-600",
  pieColor: '#ea7ccc'
},
{
  name: "Balance Account",
  id: "balance-account",
  type: BillType.Expenses,
  icon: "icon-ruler",
  color: "bg-red-600",
  pieColor: '#40f8ff'
},
{
  name: "Other",
  id: "other-expenses",
  type: BillType.Expenses,
  icon: "icon-bookmark",
  color: "bg-red-600",
  pieColor: '#4d3c77'
},
]

export const IncomeBillCategories: BillCategory[] = [{
  name: "Wage",
  id: "wage",
  type: BillType.Income,
  icon: "icon-credit-card",
  color: "bg-red-600",
  pieColor: '#5470c6'
},
{
  name: "Part Time",
  id: "part-time",
  type: BillType.Income,
  icon: "icon-community",
  color: "bg-red-600",
  pieColor: '#91cc75'
},
{
  name: "Lean",
  id: "lean",
  type: BillType.Income,
  icon: "icon-mail-open",
  color: "bg-red-600",
  pieColor: "#fac858",
},
{
  name: "Refund",
  id: "refund",
  type: BillType.Income,
  icon: "icon-arrow-bottom-right",
  color: "bg-red-600",
  pieColor: "#ee6666",
},
{
  name: "Drawback",
  id: "drawback",
  type: BillType.Income,
  icon: "icon-pentagon-right",
  color: "bg-red-600",
  pieColor: "#73c0de",
},
{
  name: "Balance Account",
  id: "balance-account",
  type: BillType.Income,
  icon: "icon-ruler",
  color: "bg-red-600",
  pieColor: "#3ba272",
},
{
  name: "Other",
  id: "other-income",
  type: BillType.Income,
  icon: "icon-bookmark",
  color: "bg-red-600",
  pieColor: "#9a60b4",
},]

export const BillCategories: BillCategory[] = [
  ...ExpensesBillCategories, ...IncomeBillCategories
]

const map = new Map<string, BillCategory>();

export const getCategoryById = (id: string) => {
  if (map.has(id)) return map.get(id)!;
  const cate = BillCategories.find((c) => c.id === id);
  if (cate) {
    map.set(id, cate);
    return cate;
  }
};
