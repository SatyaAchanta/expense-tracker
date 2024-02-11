import React from "react";
import { useDisclosure, Accordion, AccordionItem } from "@nextui-org/react";
import { getDateInReadableFormat } from "../utils/date";
import { atom, useAtom } from "jotai";
import { ActionModal } from "./ActionModal";
import { deleteExpense } from "../utils/api";
import { mutate } from "swr";
import { ExpenseForm } from "./ExpenseForm";
import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";
import { getUserExpenses } from "../utils/requests";
import { userExpenses } from "../store/expense";
import { iExpenseEntry } from "@/types";
import { get } from "http";
import { m } from "framer-motion";

const DELETE_MESSAGE = "Are you sure you want to delete this expense?";

interface iExpenseCardProps {
  expenseId: string;
}

const isEditAtom = atom(false);

export const ExpenseCard = (data: iExpenseCardProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [expenses, setExpenses] = useAtom(userExpenses);
  const [isEdit, setIsEdit] = useAtom(isEditAtom);

  const expense: iExpenseEntry = expenses.find(
    (expense) => expense.id === data.expenseId,
  )!;

  const onDelete = async () => {
    const { data, status } = await deleteExpense(expense.id!);

    if (status == 200) {
      console.log("Expense deleted: ", data);
      console.log("Expenses before deleting: ", expenses.length);
      const filteredExpenses = expenses.filter((exp) => exp.id !== expense.id);
      console.log("Expenses after deleting: ", filteredExpenses.length);
      setExpenses([]);
    } else {
      console.log("Error deleting expense: ");
    }
    onClose();
  };

  const onModalClose = () => {
    setIsEdit(false);
    onClose();
  };

  const onEditSuccess = (data: iExpenseEntry) => {
    const currentExpenses = [...expenses];
    const index = currentExpenses.findIndex((exp) => exp.id === expense.id);
    currentExpenses[index] = data;
    console.log("Updated Expense: ", currentExpenses[index]);
    setExpenses(currentExpenses);
  };

  return (
    <>
      <Accordion variant="light">
        <AccordionItem
          key="1"
          aria-label="Chung Miller"
          subtitle={
            <div className="ml-2 font-serif">
              {getDateInReadableFormat(expense.purchaseDate)}
            </div>
          }
          title={
            <div className="flex justify-between ml-2 font-serif">
              <span>{expense.name}</span>
              <span className="font-semibold text-2xl font-mono text-sky-600">
                {expense.price}
              </span>
            </div>
          }
        >
          <div className="flex justify-end gap-2">
            <EyeIcon
              className="h-6 w-6 text-blue-500"
              onClick={() => {
                setIsEdit(true);
                onOpen();
              }}
            />
            <TrashIcon
              className="h-6 w-6 text-red-500"
              onClick={() => {
                setIsEdit(false);
                onOpen();
              }}
            />
          </div>
        </AccordionItem>
      </Accordion>
      <ActionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onModalClose={onClose}
        onModalAction={onDelete}
        actionButtonTitle={isEdit ? "Save" : "Delete"}
        header={isEdit ? "Edit Expense" : "Delete Expense"}
        body={
          isEdit ? (
            <ExpenseForm
              id={expense.id!}
              name={expense.name}
              place={expense.place}
              price={expense.price}
              description={expense.description!}
              purchaseDate={getDateInReadableFormat(expense.purchaseDate)}
              closeModal={onModalClose}
              isUpdate={true}
              onEditSuccess={onEditSuccess}
            />
          ) : (
            DELETE_MESSAGE
          )
        }
        isEdit={isEdit}
      />
    </>
  );
};
