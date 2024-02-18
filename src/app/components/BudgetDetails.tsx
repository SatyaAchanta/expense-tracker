import React, { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { BudgetSettings } from "./BudgetSettings";
import {
  budgetMax,
  flagExpenseThreshold,
  totalExpenses,
} from "../store/expense";
import { getTotalExpenses, getUserBudget } from "../utils/requests";
import { Spinner, Card, CardBody, CardHeader } from "@nextui-org/react";
import { AlertIcon } from "./icons/AlertIcon";

const BudgetDetails = () => {
  const { res, isError, isLoading } = getUserBudget();
  const { totalExpensesRes, isTotalError } = getTotalExpenses();
  const [budgetMaxValue, setBudgetMaxValue] = useAtom(budgetMax);
  const setFlagExpenseValue = useSetAtom(flagExpenseThreshold);
  const [totalExpensesValue, setTotalExpensesValue] = useAtom(totalExpenses);

  const determineBarColor = () => {
    const percentage = (totalExpensesValue / budgetMaxValue) * 100;

    if (percentage < 50) {
      return "success";
    } else if (percentage < 75) {
      return "warning";
    } else {
      return "danger";
    }
  };

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
    <div className="mt-8">
      {isLoading && (
        <div className="flex justify-center h-full">
          <Spinner size="lg" label="loading..." />
        </div>
      )}
      {budgetMaxValue !== 0 && (
        <div>
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
        </div>
      )}
      {budgetMaxValue == 0 && !isLoading && <BudgetSettings />}
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
    </div>
  );
};

export default BudgetDetails;
