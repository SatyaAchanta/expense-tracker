"use client";

import { useEffect } from "react";
import { useAtom, useStore } from "jotai";
import { isNewExpenseSaved } from "../store/expense";

export const Expenses = () => {
  // const [isExpenseSaved, setIsExpenseSaved] =  useAtom(isNewExpenseSaved);

  const expenseAtom = useStore();

  return (
    <div>
      New Expense Saved: {expenseAtom.get(isNewExpenseSaved) ? "yes" : "no"}
    </div>
  );
};
