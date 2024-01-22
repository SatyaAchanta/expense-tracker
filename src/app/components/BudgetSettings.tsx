import { Button, Divider, Spacer } from "@nextui-org/react";
import { DashIcon } from "./icons/DashIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { updateUserBudget } from "../utils/api";
import { atom, useAtom, useSetAtom } from "jotai";
import { budgetMax, flagExpenseThreshold } from "../store/expense";

const budgetAtom = atom(0);
const flagExpenseAtom = atom(0);

export const BudgetSettings = () => {
  const setBudgetValue = useSetAtom(budgetMax);
  const setFlagExpenseValue = useSetAtom(flagExpenseThreshold);
  const [budget, setBudget] = useAtom(budgetAtom);
  const [flagExpense, setFlagExpense] = useAtom(flagExpenseAtom);

  const saveBudget = async (budget: number, flagExpensThreshold: number) => {
    const { data, status } = await updateUserBudget(
      budget,
      flagExpensThreshold,
    );

    if (status == 200) {
      setBudgetValue(data.budget);
      setFlagExpenseValue(data.flagExpenseTreshold);
    } else {
      console.log("Error saving budget: ");
    }
  };

  return (
    <>
      <div className="budget">
        <div className="flex text-2xl justify-center">
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
        <div className="flex text-2xl justify-center">
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
        >
          Save
        </Button>
      </div>
    </>
  );
};
