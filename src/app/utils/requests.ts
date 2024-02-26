import { iExpenseEntry } from "@/types";
import useSWR from "swr";

export const getUserExpenses = (searchOn = "", searchVal = "") => {
  const { data, error, mutate } = useSWR(
    `/api/expenses?searchOn=${searchOn}&searchVal=${searchVal}`,
    {
      fetcher: (url) => fetch(url).then((res) => res.json()),
    }
  );

  const expenses: iExpenseEntry[] = [];

  data?.data.forEach((expense) => {
    expenses.push({
      name: expense.name,
      price: expense.price,
      purchaseDate: new Date(expense.purchaseDate),
      place: expense.place,
      description: expense.description,
      id: expense.id,
    });
  });

  return {
    expenses,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const getUserBudget = () => {
  const { data, error, mutate } = useSWR("/api/budget", {
    fetcher: (url) => fetch(url).then((res) => res.json()),
  });

  return {
    res: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const getTotalExpenses = () => {
  const { data, error, mutate } = useSWR("/api/expenses/analytics", {
    fetcher: (url) => fetch(url).then((res) => res.json()),
  });

  return {
    totalExpensesRes: data,
    isTotalLoading: !error && !data,
    isTotalError: error,
    mutate,
  };
};
