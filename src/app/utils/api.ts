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

// Get all expenses for the current user from the API endpoint /api/expenses
// and return iExpenseResponse as a promise. Handle res.ok and res.status along with
// res.500 with data as null

export const getExpenses = async (): Promise<iExpenseResponse> => {
  const res = await fetch(new Request(createUrl("/api/expenses")));
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

export const deleteExpense = async (id: string): Promise<iExpenseResponse> => {
  const res = await fetch(
    new Request(createUrl(`/api/expenses/${id}`), {
      method: "DELETE",
    })
  );
  if (res.ok) {
    return {
      status: 200,
      data: "success",
    };
  } else {
    return {
      status: 500,
      data: "failure",
    };
  }
};
