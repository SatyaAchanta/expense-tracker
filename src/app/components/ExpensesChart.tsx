import { useAtom } from "jotai";
import { userExpenses } from "../store/expense";
import { groupExpensesByWeek } from "../utils/expenses";

export const ExpensesChart = () => {
  const [expenses, setExpenses] = useAtom(userExpenses);
  groupExpensesByWeek(expenses);
  return (
    <div>
      <h1>Expenses Chart</h1>
    </div>
  );
};
