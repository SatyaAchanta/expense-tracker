import { ExpenseCard } from "./ExpenseCard";
import { atom, useAtom, useAtomValue } from "jotai";
import { userExpenses } from "../store/expense";
import { Button, Pagination, user } from "@nextui-org/react";
import { use, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { iExpenseEntry } from "@/types";

interface iExpenseCardsProps {
  expenses: iExpenseEntry[];
}

const MAX_ITEMS_PER_PAGE = 5;
const currentPageAtom = atom(1);
const startAtom = atom(0);
const endAtom = atom(MAX_ITEMS_PER_PAGE);

export const ExpenseCards = () => {
  // const [allUserExpenses, setAllUserExpenses] = useAtom(userExpenses);
  const expenses = atom((get) => get(userExpenses));
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const totalNumbeOfExpenses = atom((get) => get(userExpenses).length);
  const totalPages = Math.ceil(expenses.length / MAX_ITEMS_PER_PAGE);
  const [start, setStart] = useAtom(startAtom);
  const [end, setEnd] = useAtom(endAtom);

  useEffect(() => {
    if (currentPage) {
      console.log("Current Page: ", currentPage);
      setStart((currentPage - 1) * MAX_ITEMS_PER_PAGE);
      setEnd(currentPage * MAX_ITEMS_PER_PAGE);
    }
  }, [currentPage]);

  return (
    <div className="grid grid-cols-1 items-end sm:block md:hidden">
      {expenses.slice(start, end).map((expense) => {
        return (
          <div className="m-2" key={`div-${expense.id}`}>
            <ExpenseCard expenseId={expense.id!} />
          </div>
        );
      })}

      {expenses.length === 0 && (
        <div className="flex justify-center">
          <h1 className="text-lg">No expenses Saved</h1>
        </div>
      )}
      <div className="flex justify-between items-center mx-8">
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          size="md"
          variant="light"
        />
        <Button isIconOnly variant="solid" color="primary" size="lg">
          <PlusIcon className="h-6 w-6 md:hidden" />
        </Button>
      </div>
    </div>
  );
};
