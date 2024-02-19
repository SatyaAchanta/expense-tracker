import { ExpenseCard } from "./ExpenseCard";
import { atom, useAtom, useAtomValue } from "jotai";
import { derivedTotalExpenses, userExpenses } from "../store/expense";
import { Button, Pagination, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { iExpenseEntry } from "@/types";
import { ActionModal } from "./ActionModal";
import { ExpenseForm } from "./ExpenseForm";

const MAX_ITEMS_PER_PAGE = 5;
const currentPageAtom = atom(1);
const startAtom = atom(0);
const endAtom = atom(MAX_ITEMS_PER_PAGE);

export const ExpenseCards = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [expenses, setExpenses] = useAtom(userExpenses);
  const totalNumbeOfExpenses = useAtomValue(derivedTotalExpenses);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const totalPages = Math.ceil(totalNumbeOfExpenses / MAX_ITEMS_PER_PAGE);
  const [start, setStart] = useAtom(startAtom);
  const [end, setEnd] = useAtom(endAtom);

  const onEditSuccess = (data: iExpenseEntry) => {
    setExpenses([data, ...expenses]);
  };

  useEffect(() => {
    if (currentPage) {
      setStart((currentPage - 1) * MAX_ITEMS_PER_PAGE);
      setEnd(currentPage * MAX_ITEMS_PER_PAGE);
    }
  }, [currentPage]);

  return (
    <div className="flex flex-col overflow-y-auto sm:block md:hidden gap-8">
      <div className="flex-1">
        {expenses.slice(start, end).map((expense) => {
          return (
            <ExpenseCard expenseId={expense.id!} key={`key-${expense.id}`} />
          );
        })}
      </div>

      {expenses.length === 0 && (
        <div className="flex justify-center">
          <h1 className="text-lg">No expenses Saved</h1>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={(page) => {
            setCurrentPage(page);
          }}
          size="md"
          variant="flat"
          color="secondary"
          showControls
          isCompact
        />
        <Button isIconOnly variant="solid" color="primary" size="md">
          <PlusIcon className="h-6 w-6 md:hidden" onClick={onOpen} />
        </Button>
      </div>
      <ActionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onModalClose={onClose}
        onModalAction={() => {
          return;
        }}
        actionButtonTitle="Add"
        header="Add Expense"
        body={
          <ExpenseForm
            id=""
            name=""
            place=""
            price={0}
            description=""
            purchaseDate={new Date().toLocaleDateString()}
            closeModal={onClose}
            isUpdate={false}
            onEditSuccess={onEditSuccess}
          />
        }
        isEdit={true}
      />
    </div>
  );
};
