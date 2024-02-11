import { iExpenseEntry } from "@/types";
import { atom, createStore } from "jotai";

export const expenseStore = createStore();
export const userExpenses = atom<iExpenseEntry[]>([]);
export const budgetMax = atom<number>(0);
export const flagExpenseThreshold = atom<number>(0);
export const totalExpenses = atom<number>(0);
export const totalNumberOfExpenses = atom<number>(0);
export const areExpensesChanged = atom<boolean>(false);

// expenseStore.set(userExpenses, []);
// expenseStore.set(budgetMax, 0);
// expenseStore.set(flagExpenseThreshold, 0);
// expenseStore.set(totalExpenses, 0);
// expenseStore.set(totalNumberOfExpenses, 0);
// expenseStore.set(areExpensesChanged, false);