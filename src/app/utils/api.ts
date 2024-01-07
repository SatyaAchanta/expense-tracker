import { iExpenseEntry, iExpenseResponse } from "@/types";

const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const addExpenseEntry = async (
  expense: iExpenseEntry
): Promise<iExpenseResponse> => {
  const res = await fetch(
    new Request(createUrl("/api/entry"), {
      method: "POST",
      body: JSON.stringify({ expense }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return {
      status: 200,
      data: data.data,
    };
  } else {
    return {
      status: 500,
      data: null,
    };
  }
};
