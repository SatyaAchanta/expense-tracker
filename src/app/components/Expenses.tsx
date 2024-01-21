import React from "react";

import { getUserExpenses } from "../utils/requests";
import { ExpenseTable } from "./ExpenseTable";
import { ExpenseCards } from "./ExpenseCards";

export const Expenses = () => {
  const { expenses, isLoading, isError } = getUserExpenses();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (expenses) {
    return (
      <>
        <ExpenseTable expenses={expenses.data} />
        <ExpenseCards expenses={expenses.data} />
      </>
    );
  }
};
