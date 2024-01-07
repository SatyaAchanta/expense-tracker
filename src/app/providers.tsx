// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { expenseStore } from "./store/expense";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={expenseStore}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
}
