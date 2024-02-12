import { iExpenseEntry } from "@/types";
import { atom, createStore } from "jotai";

export const expenseStore = createStore();
export const userExpenses = atom<iExpenseEntry[]>([]);
export const budgetMax = atom<number>(0);
export const flagExpenseThreshold = atom<number>(0);
export const totalExpenses = atom<number>(0);
export const totalNumberOfExpenses = atom<number>(0);
export const areExpensesChanged = atom<boolean>(false);
export const derivedTotalExpenses = atom((get) => get(userExpenses).length);