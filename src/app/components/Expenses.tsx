import React, { use, useEffect } from "react";

import { getUserExpenses } from "../utils/requests";
import { ExpenseCards } from "./ExpenseCards";
import {
  areExpensesChanged,
  expenseStore,
  totalNumberOfExpenses,
  userExpenses,
} from "../store/expense";
import { useAtom, useSetAtom } from "jotai";

export const Expenses = () => {
  let { expenses, isLoading, isError } = getUserExpenses();
  const setUserTotalExpenses = useSetAtom(totalNumberOfExpenses);
  const [allUserExpenses, setAllUserExpenses] = useAtom(userExpenses);

  useEffect(() => {
    if (expenses.length !== allUserExpenses.length) {
      setAllUserExpenses(expenses);
      setUserTotalExpenses(expenses.length);
    }
  }, [expenses]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (allUserExpenses.length === 0) return <div>No expenses</div>;
  if (allUserExpenses.length > 0) {
    return (
      <>
        <ExpenseCards />
      </>
    );
  }
};
