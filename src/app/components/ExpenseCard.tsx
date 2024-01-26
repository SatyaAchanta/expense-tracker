import React from "react";
import {
  useDisclosure,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
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
      <Card className="b-4 p-4 font-serif">
        <CardHeader className="flex justify-between">
          <label className="text-xl">{purchase}</label>
          <span className="font-semibold text-2xl">${price}</span>
        </CardHeader>
        <CardBody className="font-serif py-0">
          {getDateInReadableFormat(new Date(date))}
        </CardBody>
        <CardFooter className="flex justify-end gap-4">
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
        </CardFooter>
      </Card>
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
