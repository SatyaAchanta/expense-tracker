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
      {userExpensesValue.length > 14 && (
        <div className="flex flex-grow mt-16">
          <ExpensesChart />
        </div>
      )}
    </div>
  );
};

export default BudgetDetails;
