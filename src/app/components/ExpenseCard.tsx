import React from "react";
import {
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { getDateInReadableFormat } from "../utils/date";
import { atom, useAtom } from "jotai";
import { ActionModal } from "./ActionModal";
import { deleteExpense } from "../utils/api";
import { mutate } from "swr";
import { ExpenseForm } from "./ExpenseForm";
import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";

const DELETE_MESSAGE = "Are you sure you want to delete this expense?";

interface ExpenseCardProps {
  purchase: string;
  date: string;
  description: string;
  price: number;
  id: string;
  place: string;
}

const isEditAtom = atom(false);

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  purchase,
  date,
  description,
  price,
  id,
  place,
}) => {
  const [isEdit, setIsEdit] = useAtom(isEditAtom);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onDelete = async () => {
    const { data, status } = await deleteExpense(id);

    if (status == 200) {
      mutate("/api/expenses");
    } else {
      console.log("Error deleting expense: ");
    }
    onClose();
  };

  const onModalClose = () => {
    setIsEdit(false);
    onClose();
  };

  return (
    <>
      <Accordion variant="bordered">
        <AccordionItem
          key="1"
          aria-label="Chung Miller"
          subtitle={
            <div className="ml-4 font-serif">
              {getDateInReadableFormat(new Date(date))}
            </div>
          }
          title={
            <div className="flex justify-between ml-4 font-serif">
              <span>{purchase}</span>
              <span className="font-semibold text-xl">${price}</span>
            </div>
          }
        >
          <div className="flex justify-end gap-3 items-center">
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
              id={id}
              name={purchase}
              place={place}
              price={price}
              description={description}
              purchaseDate={date}
              closeModal={onModalClose}
              isUpdate={true}
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
