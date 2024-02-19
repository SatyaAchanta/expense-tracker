import React, { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  budgetMax,
  flagExpenseThreshold,
  totalExpenses,
  userExpenses,
} from "../store/expense";
import { getTotalExpenses, getUserBudget } from "../utils/requests";
import { Spinner, Card, CardHeader } from "@nextui-org/react";
import { AlertIcon } from "./icons/AlertIcon";
import { ExpensesChart } from "./ExpensesChart";

const BudgetDetails = () => {
  const { res, isError, isLoading } = getUserBudget();
  const { totalExpensesRes, isTotalError } = getTotalExpenses();
  const [budgetMaxValue, setBudgetMaxValue] = useAtom(budgetMax);
  const setFlagExpenseValue = useSetAtom(flagExpenseThreshold);
  const [totalExpensesValue, setTotalExpensesValue] = useAtom(totalExpenses);
  const userExpensesValue = useAtomValue(userExpenses);

  useEffect(() => {
    if (res && !isError) {
      setBudgetMaxValue(res.data.budget);
      setFlagExpenseValue(res.data.flagExpenseTreshold);
    }
  }, [res, isError]);

  useEffect(() => {
    if (totalExpensesRes && !isTotalError) {
      setTotalExpensesValue(+totalExpensesRes.data);
    }
  }, [totalExpensesRes, isTotalError]);

  return (
    <div className="flex flex-col mt-8 h-full">
      {isLoading && (
        <div className="justify-center h-full">
          <Spinner size="lg" label="loading..." />
        </div>
      )}
      {budgetMaxValue !== 0 && (
        <div className="flex flex-wrap justify-around my-4 mx-2 px-8 py-8 font-bold gap-8 bg-sky-900 text-white rounded-md">
          <div className="">
            <label className="text-sm">Total Spent</label>
            <p className="text-5xl">{totalExpensesValue}</p>
          </div>
          <div>
            <label className="text-sm">Total Budget</label>
            <p className="text-5xl">{budgetMaxValue}</p>
          </div>
        </div>
      )}
      {totalExpensesValue > budgetMaxValue && (
        <Card className="mt-4 mx-2 bg-amber-500">
          <CardHeader>
            <div className="flex gap-2 items-center">
              <AlertIcon />
              <div className="text-md font-semibold">
                You exceeded the limit by USD $
                {totalExpensesValue - budgetMaxValue}.
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      {userExpensesValue.length > 14 && (
        <div className="flex flex-grow mt-16">
          <ExpensesChart />
        </div>
      )}
    </div>
  );
};

export default BudgetDetails;
