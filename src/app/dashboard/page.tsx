"use client";

import { UserButton } from "@clerk/nextjs";
import { Tabs, Tab, Spinner } from "@nextui-org/react";
import { CashIcon } from "../components/icons/CashIcon";
import { SettingsIcon } from "../components/icons/SettingsIcon";
import BudgetDetails from "../components/BudgetDetails";
import { ProfileDetailsIcon } from "../components/icons/ProfileDetailsIcon";
import { BudgetSettings } from "../components/BudgetSettings";
import { useAtom, useSetAtom } from "jotai";
import { areExpensesChanged, userExpenses } from "../store/expense";
import { getUserExpenses } from "../utils/requests";
import { Suspense, useEffect } from "react";
import { ExpenseCards } from "../components/ExpenseCards";

const Dashboard = () => {
  const { expenses, isLoading, isError } = getUserExpenses();
  const setAllUserExpenses = useSetAtom(userExpenses);
  const setAreExpensesChanged = useSetAtom(areExpensesChanged);

  useEffect(() => {
    if (expenses) {
      setAllUserExpenses(expenses);
      setAreExpensesChanged(false);
    }
  }, [expenses]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="md:hidden">
        <header className="flex w-full items-center justify-end md:justify-end px-6 py-6 mb-4">
          <UserButton />
        </header>
        <div className="grid mt-8">
          <Tabs
            className="md:hidden justify-center"
            size="lg"
            variant="bordered"
            color="primary"
          >
            <Tab title={"Budget"} className="md:hidden">
              <BudgetDetails />
            </Tab>
            <Tab title={"Expenses"} className="md:hidden">
              <ExpenseCards />
            </Tab>
            <Tab title={"Settings"} className="md:hidden">
              <BudgetSettings />
            </Tab>
          </Tabs>
        </div>
        <div className="hidden md:grid grid-cols-12 md:gap-x-8 py-10 text-black bg-white h-full w-full">
          <div className="col-span-12 md:col-span-8 m-2 md:ml-10">
            <ExpenseCards />
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center h-screen items-center">
        <label className="text-3xl font-serif">
          OOPS. We are only for mobile devices. Please visit us from mobile
          screen
        </label>
      </div>
    </Suspense>
  );
};

export default Dashboard;
