import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  useDisclosure,
  CardFooter,
} from "@nextui-org/react";
import { getDateInUserTimezone } from "../utils/date";
import { useAtom, useStore } from "jotai";
import { EditModal } from "./EditModal";
import { deleteExpense } from "../utils/api";
import { isExpenseDeleted } from "../store/expense";
import { mutate } from "swr";
import { Delete } from "react-feather";

interface ExpenseCardProps {
  purchase: string;
  date: string;
  description: string;
  price: number;
  id: string;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  purchase,
  date,
  description,
  price,
  id,
}) => {
  const [, setIsExpenseDeleted] = useAtom(isExpenseDeleted);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onDelete = async () => {
    console.log("Deleting expense: ", id);
    const { data, status } = await deleteExpense(id);

    if (status == 200) {
      console.log("Deleted expense: ", data);
      mutate("/api/expenses");
    } else {
      console.log("Error deleting expense: ", data);
    }
    onClose();
  };

  return (
    <>
      <Card className="flex">
        <CardHeader className="pb-0 justify-between">
          <label className="basis-1/2 text-lg">{purchase}</label>
          <div>
            <label className="text-sm">$</label>
            <label className="text-5xl">{price}</label>
          </div>
        </CardHeader>
        <CardBody className="py-0">
          <label className="text-s italic">
            {getDateInUserTimezone(new Date(date))}
          </label>
          <label className="text-s italic">{description}</label>
        </CardBody>
        <CardFooter className="justify-end">
          {/* <Button color="primary" variant="light" size="sm">
            <Edit />
          </Button> */}

          <Button color="danger" variant="light" size="sm" onPress={onOpen}>
            <Delete />
          </Button>
          <EditModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onModalClose={onClose}
            onModalAction={onDelete}
          />
        </CardFooter>
      </Card>
    </>
  );
};
