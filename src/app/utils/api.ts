import { iExpenseEntry, iExpenseResponse } from "@/types";
import { NextResponse } from "next/server";
import { getUserByClerkId } from "./auth";
import { prisma } from "./db";

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

export const updateExpense = async (
  id: string,
  content: iExpenseEntry
): Promise<iExpenseResponse> => {
  const res = await fetch(
    new Request(createUrl(`/api/expenses/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
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

export const updateUserBudget = async (
  budget: number,
  flagExpenseTreshold: number
): Promise<iExpenseResponse> => {
  const res = await fetch(
    new Request(createUrl("/api/budget"), {
      method: "PATCH",
      body: JSON.stringify({ budget, flagExpenseTreshold }),
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

export const getUserBudget = async (): Promise<iExpenseResponse> => {
  const res = await fetch(new Request(createUrl("/api/budget")));
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
