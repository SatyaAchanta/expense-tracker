import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { BudgetSettings } from "./BudgetSettings";
import {
  budgetMax,
  flagExpenseThreshold,
  totalExpenses,
} from "../store/expense";
import { getTotalExpenses, getUserBudget } from "../utils/requests";
import { Divider, Progress, Spacer, Spinner } from "@nextui-org/react";

const BudgetDetails = () => {
  const { res, isError, isLoading, mutate } = getUserBudget();

  const { totalExpensesRes, isTotalError } = getTotalExpenses();

  const [budgetMaxValue, setBudgetMaxValue] = useAtom(budgetMax);

  const [flagExpenseValue, setFlagExpenseValue] = useAtom(flagExpenseThreshold);

  const [totalExpensesValue, setTotalExpensesValue] = useAtom(totalExpenses);

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
      {isLoading && <Spinner />}
      {budgetMaxValue !== 0 && (
        <div>
          <div className="flex justify-center font-semibold">TOTAL BUDGET</div>
          <div className="flex justify-center mt-8 font-bold">
            <p className="text-9xl">{budgetMaxValue}</p>
            <span className="text-sm">USD</span>
          </div>
          <div className="m-8">
            <Progress
              label="Total Spent"
              size="lg"
              value={totalExpensesValue}
              maxValue={budgetMaxValue}
              color="warning"
              formatOptions={{ style: "currency", currency: "USD" }}
              showValueLabel={true}
            />
          </div>
        </div>
      )}
      {budgetMaxValue == 0 && (
        <BudgetSettings
          budgetValue={budgetMaxValue}
          flagExpenseValue={flagExpenseValue}
        />
      )}
    </div>
  );
};

export default BudgetDetails;
