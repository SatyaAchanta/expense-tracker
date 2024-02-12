"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "jotai";
import { expenseStore } from "./store/expense";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <NextUIProvider>
        <Provider>{children}</Provider>
      </NextUIProvider>
    </ClerkProvider>
  );
}
