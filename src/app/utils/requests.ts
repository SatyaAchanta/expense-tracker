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
