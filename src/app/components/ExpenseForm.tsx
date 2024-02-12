"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import { iExpenseEntry } from "@/types";
import { addExpenseEntry, updateExpense } from "../utils/api";
import { getDateForInputView } from "../utils/date";
import { ShopIcon } from "./icons/ShopIcon";
import { CashIcon } from "./icons/CashIcon";
import { BagIcon } from "./icons/BagIcon";
import { CalendarIcon } from "./icons/CalendarIcon";
import { useAtom } from "jotai";
import { userExpenses } from "../store/expense";
import { useEffect } from "react";

interface iUpdateFormProps {
  id: string;
  name: string;
  price: number;
  purchaseDate: string;
  place: string;
  description?: string;
  isUpdate: boolean;
  closeModal: () => void;
  onEditSuccess: (data: iExpenseEntry) => void;
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

export const ExpenseForm: React.FC<iUpdateFormProps> = (
  expense: iUpdateFormProps,
) => {
  const [expenses, setUserExpenses] = useAtom(userExpenses);

  const onSubmit: SubmitHandler<iExpenseEntry> = async (data) => {
    let res = null;
    if (expense.isUpdate) {
      res = await updateExpense(expense.id, data);
    } else {
      res = await addExpenseEntry(data);
    }

    if (res.status === 200) {
      const data = res.data;

      const updatedExpense: iExpenseEntry = {
        id: data.id,
        name: data.name,
        price: data.price,
        place: data.place,
        description: data.description,
        purchaseDate: data.purchaseDate,
      };

      expense.onEditSuccess(updatedExpense);
      // setUserExpenses([...expenses, updatedExpense]);
    }
    expense.closeModal();
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="grid font-serif">
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
            className="justify-center md:hidden"
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
