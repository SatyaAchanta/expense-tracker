import { atom, createStore } from "jotai";

export const expenseStore = createStore();

export const expenseAtom = atom("testing");

export const isNewExpenseSaved = atom(false);

expenseStore.set(expenseAtom, "Satya testing");
expenseStore.set(isNewExpenseSaved, false);
