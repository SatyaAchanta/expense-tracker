import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { BudgetSettings } from "./BudgetSettings";
import {
  budgetMax,
  flagExpenseThreshold,
  totalExpenses,
} from "../store/expense";
import { getTotalExpenses, getUserBudget } from "../utils/requests";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Spinner,
} from "@nextui-org/react";
import { AlertIcon } from "./icons/AlertIcon";

const BudgetDetails = () => {
  const { res, isError, isLoading } = getUserBudget();

  const { totalExpensesRes, isTotalError } = getTotalExpenses();

  const [budgetMaxValue, setBudgetMaxValue] = useAtom(budgetMax);

  const [flagExpenseValue, setFlagExpenseValue] = useAtom(flagExpenseThreshold);

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
          <div className="flex justify-center font-semibold">TOTAL BUDGET</div>
          <div className="flex justify-center mt-8 font-bold">
            <p className="text-5xl">{budgetMaxValue}</p>
            <span className="text-sm">USD</span>
          </div>
          <div className="m-8">
            <Progress
              label="Total Spent"
              size="lg"
              value={totalExpensesValue}
              maxValue={budgetMaxValue}
              color={determineBarColor()}
              formatOptions={{ style: "currency", currency: "USD" }}
              showValueLabel={true}
            />

            {totalExpensesValue > budgetMaxValue && (
              <Card className="mt-4 bg-amber-500">
                <CardHeader>
                  <div className="flex gap-2 items-center">
                    <AlertIcon />
                    <div className="text-xl font-semibold">Warning</div>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="font-semibold">
                    You exceeded the limit by USD{" "}
                    {totalExpensesValue - budgetMaxValue}. Try increasing your
                    budget limit
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      )}
      {budgetMaxValue == 0 && !isLoading && <BudgetSettings />}
    </div>
  );
};

export default BudgetDetails;
