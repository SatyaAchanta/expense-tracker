import React, { useEffect } from "react";

import { getUserExpenses } from "../utils/requests";
import { ExpenseCards } from "./ExpenseCards";
import { useAtom } from "jotai";
import { userExpenses } from "../store/expense";

export const Expenses = () => {
  const { expenses, isLoading, isError } = getUserExpenses();
  const [allUserExpenses, setAllUserExpenses] = useAtom(userExpenses);

  useEffect(() => {
    if (expenses.length !== allUserExpenses.length) {
      setAllUserExpenses(expenses);
    }
  }, [expenses]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (allUserExpenses.length === 0) {
    return (
      <div className="flex justify-center">
        <p>No expenses found</p>
      </div>
    );
  }
  if (allUserExpenses.length > 0) {
    return (
      <>
        <ExpenseCards />
      </>
    );
  }
};
