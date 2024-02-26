import React, { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  budgetMax,
  flagExpenseThreshold,
  totalExpenses,
  userExpenses,
} from "../store/expense";
import { getTotalExpenses, getUserBudget } from "../utils/requests";
import {
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { AlertIcon } from "./icons/AlertIcon";
import { ExpensesChart } from "./ExpensesChart";
import { ExpenseCard } from "./ExpenseCard";
import { retrieveTopThreeExpenses } from "../utils/expenses";
import { BudgetSettings } from "./BudgetSettings";

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
    <div className="flex flex-col m-8">
      {isLoading && (
        <div className="justify-center h-full">
          <Spinner size="lg" label="loading..." />
        </div>
      )}
      {budgetMaxValue !== 0 && (
        <Card className="border-none bg-gradient-to-br from-sky-900 to-fuchsia-500">
          <CardBody className="justify-center items-center pb-0">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              value={(totalExpensesValue / budgetMaxValue) * 100}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-white/30",
                content: "text-white/90 text-small font-semibold",
              }}
              variant="bordered"
            >
              Budget Limit {budgetMaxValue}
            </Chip>
          </CardFooter>
        </Card>
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

      {/* {userExpensesValue.length > 3 && (
        <div className="mt-8">
          <div className="text-xl font-semibold text-center mt-2">
            Top 3 Expenses
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {retrieveTopThreeExpenses(userExpensesValue)
              .slice(0, 3)
              .map((expense, _) => (
                <ExpenseCard
                  expenseId={expense.id!}
                  key={`key-${expense.id}`}
                />
              ))}
          </div>
        </div>
      )} */}
      {budgetMaxValue == 0 && !isLoading && <BudgetSettings />}
    </div>
  );
};

export default BudgetDetails;
