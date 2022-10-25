import { BillType, type BillCategory } from "./bill";

export const ExpensesBillCategories: BillCategory[] = [{
  name: "Food",
  id: "food",
  type: BillType.Expenses,
  icon: "icon-bowl",
  color: "bg-red-600",
},
{
  name: "Transport",
  id: "transport",
  type: BillType.Expenses,
  icon: "icon-airplane",
  color: "bg-red-600",
},
{
  name: "Shopping",
  id: "shopping",
  type: BillType.Expenses,
  icon: "icon-shopping-cart",
  color: "bg-red-600",
},
{
  name: "Housing",
  id: "housing",
  type: BillType.Expenses,
  icon: "icon-home-alt",
  color: "bg-red-600",
},
{
  name: "Entertainment",
  id: "entertainment",
  type: BillType.Expenses,
  icon: "icon-dice-3",
  color: "bg-red-600",
},
{
  name: "Medical",
  id: "medical",
  type: BillType.Expenses,
  icon: "icon-pill",
  color: "bg-red-600",
},
{
  name: "Education",
  id: "education",
  type: BillType.Expenses,
  icon: "icon-pen",
  color: "bg-red-600",
},
{
  name: "Relationship",
  id: "relationship",
  type: BillType.Expenses,
  icon: "icon-gift",
  color: "bg-red-600",
},
{
  name: "Balance Account",
  id: "balance-account",
  type: BillType.Expenses,
  icon: "icon-ruler",
  color: "bg-red-600",
},
{
  name: "Other",
  id: "other-expenses",
  type: BillType.Expenses,
  icon: "icon-bookmark",
  color: "bg-red-600",
},
]

export const IncomeBillCategories: BillCategory[] = [{
  name: "Wage",
  id: "wage",
  type: BillType.Income,
  icon: "icon-credit-card",
  color: "bg-red-600",
},
{
  name: "Part Time",
  id: "part-time",
  type: BillType.Income,
  icon: "icon-community",
  color: "bg-red-600",
},
{
  name: "Lean",
  id: "lean",
  type: BillType.Income,
  icon: "icon-mail-open",
  color: "bg-red-600",
},
{
  name: "Refund",
  id: "refund",
  type: BillType.Income,
  icon: "icon-arrow-bottom-right",
  color: "bg-red-600",
},
{
  name: "Drawback",
  id: "drawback",
  type: BillType.Income,
  icon: "icon-pentagon-right",
  color: "bg-red-600",
},
{
  name: "Balance Account",
  id: "balance-account",
  type: BillType.Income,
  icon: "icon-ruler",
  color: "bg-red-600",
},
{
  name: "Other",
  id: "other-income",
  type: BillType.Income,
  icon: "icon-bookmark",
  color: "bg-red-600",
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
