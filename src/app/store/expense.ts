import { iExpenseEntry } from "@/types";
import { atom, createStore } from "jotai";

export const expenseStore = createStore();

export const expenseAtom = atom("testing");

export const isNewExpenseSaved = atom(false);

export const userExpenses = atom<iExpenseEntry[]>([]);

expenseStore.set(expenseAtom, "Satya testing");
expenseStore.set(isNewExpenseSaved, false);
expenseStore.set(userExpenses, []);
