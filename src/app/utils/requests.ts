import useSWR from "swr";

export const getUserExpenses = () => {
  const { data, error, mutate } = useSWR("/api/expenses", {
    fetcher: (url) => fetch(url).then((res) => res.json()),
  });

  return {
    expenses: data,
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
