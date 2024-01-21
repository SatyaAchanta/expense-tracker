"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { isNewExpenseSaved } from "../store/expense";
import { Input, Textarea, Card, CardBody, Button } from "@nextui-org/react";
import { iExpenseEntry, iExpenseResponse } from "@/types";
import { useStore } from "jotai";
import { addExpenseEntry, updateExpense } from "../utils/api";
import { getDateForInputView, getDateInUserTimezone } from "../utils/date";
import { on } from "events";
import { mutate } from "swr";
import { ShopIcon } from "./icons/ShopIcon";
import { CashIcon } from "./icons/CashIcon";
import { BagIcon } from "./icons/BagIcon";
import { DetailsIcon } from "./icons/DetailsIcon";
import { Calendar } from "react-feather";
import { CalendarIcon } from "./icons/CalendarIcon";

interface iUpdateFormProps {
  id: string;
  name: string;
  price: number;
  purchaseDate: string;
  place: string;
  description?: string;
  closeModal: () => void;
}

const schema = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  place: yup.string().required(),
  description: yup.string(),
  purchaseDate: yup.date().required(),
});

const isInvalidElement = (
  elementName: String,
  error: FieldError | undefined,
) => {
  if (error && error.message !== undefined) {
    return true;
  }
  return false;
};

export const UpdateForm: React.FC<iUpdateFormProps> = (
  expense: iUpdateFormProps,
) => {
  console.log(`expense`, expense);

  const onSubmit: SubmitHandler<iExpenseEntry> = async (data) => {
    const res = await updateExpense(expense.id, data);

    console.log(`submitResponse`, res);
    if (res.status === 200) {
      console.log("Yes new expenses saved");
      mutate("/api/expenses");
      expense.closeModal();
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="grid">
      <form onSubmit={handleSubmit(onSubmit)} className="m-2 w-auto md:ml-8">
        <Input
          className="mb-4"
          type="text"
          placeholder="Expense Name"
          isInvalid={isInvalidElement("name", errors.name)}
          {...register("name", { required: true, maxLength: 40 })}
          errorMessage={isInvalidElement("name", errors.name) && "Required"}
          color={isInvalidElement("name", errors.name) ? "danger" : "default"}
          defaultValue={expense.name}
          startContent={<BagIcon />}
        />

        <Input
          className="mb-4"
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          isInvalid={errors.price?.message !== undefined ? true : false}
          color={isInvalidElement("price", errors.price) ? "danger" : "default"}
          errorMessage={isInvalidElement("price", errors.price) && "Required"}
          defaultValue={expense.price.toString()}
          startContent={<CashIcon />}
        />

        <Input
          className="mb-4"
          type="text"
          placeholder="Place"
          {...register("place", { required: true })}
          isInvalid={isInvalidElement("place", errors.place)}
          color={isInvalidElement("place", errors.place) ? "danger" : "default"}
          errorMessage={isInvalidElement("place", errors.place) && "Required"}
          defaultValue={expense.place}
          startContent={<ShopIcon />}
        />

        <Textarea
          className="mb-4"
          type="text"
          placeholder="brief description"
          maxLength={100}
          minRows={2}
          maxRows={4}
          variant="bordered"
          defaultValue={expense.description}
          {...register("description")}
        />
        <Input
          className="mb-4"
          type="date"
          placeholder="Date of purchase"
          isInvalid={isInvalidElement("purchaseDate", errors.purchaseDate)}
          color={
            isInvalidElement("purchaseDate", errors.purchaseDate)
              ? "danger"
              : "default"
          }
          errorMessage={
            isInvalidElement("purchaseDate", errors.purchaseDate) && "Required"
          }
          defaultValue={getDateForInputView(new Date(expense.purchaseDate))}
          startContent={<CalendarIcon />}
          {...register("purchaseDate", { required: true })}
        />

        <div className="flex justify-end gap-2">
          <Button
            color="primary"
            className="justify-center"
            variant="bordered"
            onClick={expense.closeModal}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" className="justify-center">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};