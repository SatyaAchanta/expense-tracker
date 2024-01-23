import { Button, Card, CardHeader, Progress, Spacer } from "@nextui-org/react";
import { DashIcon } from "./icons/DashIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { updateUserBudget } from "../utils/api";
import { atom, useAtom } from "jotai";
import { budgetMax, flagExpenseThreshold } from "../store/expense";
import { useEffect, useState } from "react";

const showMessageAtom = atom(false);

export const BudgetSettings = () => {
  const [budgetValue, setBudgetValue] = useAtom(budgetMax);
  const [flagExpenseValue, setFlagExpenseValue] = useAtom(flagExpenseThreshold);
  const [budget, setBudget] = useState(budgetValue);
  const [flagExpense, setFlagExpense] = useState(flagExpenseValue);
  const [showSaveMesage, setShowSaveMessage] = useAtom(showMessageAtom);

  const saveBudget = async (budget: number, flagExpensThreshold: number) => {
    const { data, status } = await updateUserBudget(
      budget,
      flagExpensThreshold,
    );

    if (status == 200) {
      setBudgetValue(data.budget);
      setFlagExpenseValue(data.flagExpenseTreshold);
      setShowSaveMessage(true);
    } else {
      console.log("Error saving budget: ");
    }
  };

  useEffect(() => {
    if (showMessageAtom) {
      setTimeout(() => {
        setShowSaveMessage(false);
      }, 10000);
    }
  }, [showSaveMesage]);

  return (
    <div>
      {showSaveMesage && (
        <div className="flex justify-center">
          <Card className="bg-sky-700 text-stone-300 font-semibold m-8">
            <CardHeader className="text-xl font-serif">Budget Saved</CardHeader>
          </Card>
        </div>
      )}
      <div className="budget mt-4">
        <div className="flex text-2xl justify-center font-serif">
          Set your total budget
        </div>
        <div className="flex justify-between m-8 items-center">
          <Button
            isIconOnly
            size="lg"
            onClick={() => {
              setBudget(budget - 50);
            }}
            variant="solid"
            color="danger"
          >
            <DashIcon />
          </Button>
          <div className="text-7xl font-semibold tracking-wide">{budget}</div>
          <Button
            isIconOnly
            size="lg"
            onClick={() => {
              setBudget(budget + 50);
            }}
            variant="solid"
            color="primary"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <Spacer y={4} />
      <div className="flag-expense mt-8">
        <div className="flex text-2xl justify-center font-serif">
          Flag Expenses Greater Than
        </div>
        <div className="flex justify-between m-8 items-center">
          <Button
            isIconOnly
            size="lg"
            onClick={() => {
              setFlagExpense(flagExpense - 10);
            }}
            variant="solid"
            color="danger"
          >
            <DashIcon />
          </Button>
          <div className="text-7xl font-semibold tracking-wide">
            {flagExpense}
          </div>
          <Button
            isIconOnly
            size="lg"
            onClick={() => {
              setFlagExpense(flagExpense + 10);
            }}
            variant="solid"
            color="primary"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <Button
          color="primary"
          variant="solid"
          size="lg"
          onClick={() => {
            saveBudget(budget, flagExpense);
          }}
          className="font-serif"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
