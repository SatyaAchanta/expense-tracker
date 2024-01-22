import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  useDisclosure,
  CardFooter,
} from "@nextui-org/react";
import { getDateInUserTimezone } from "../utils/date";
import { atom, useAtom, useAtomValue, useStore } from "jotai";
import { ActionModal } from "./ActionModal";
import { deleteExpense } from "../utils/api";
import { mutate } from "swr";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./EditIcon";
import { ExpenseForm } from "./ExpenseForm";
import { FlagIcon } from "./icons/FlagIcon";
import { totalExpenses } from "../store/expense";

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
      <Card className="flex">
        <CardHeader className="pb-0 justify-between">
          <label className="basis-1/2 text-3xl">{purchase}</label>
          <div>
            <label className="text-sm">$</label>
            <label className="text-5xl">{price}</label>
          </div>
        </CardHeader>
        <CardBody className="py-0">
          <label className="text-sm italic">
            {getDateInUserTimezone(new Date(date))}
          </label>
          {/* <label className="text-s italic">{description}</label> */}
        </CardBody>
        <CardFooter className="justify-end">
          <Button
            color="primary"
            isIconOnly
            variant="light"
            size="md"
            onClick={() => {
              setIsEdit(true);
              onOpen();
            }}
          >
            <EditIcon />
          </Button>

          <Button
            color="danger"
            variant="light"
            size="md"
            isIconOnly
            onClick={() => {
              setIsEdit(false);
              onOpen();
            }}
          >
            <DeleteIcon />
          </Button>
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
