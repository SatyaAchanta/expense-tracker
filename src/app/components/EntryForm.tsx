"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { Input, Textarea, Card, CardBody, Button } from "@nextui-org/react";
import { iExpenseEntry, iExpenseResponse } from "@/types";
import { useStore } from "jotai";
import { addExpenseEntry } from "../utils/api";
import { BagIcon } from "./icons/BagIcon";
import { CashIcon } from "./icons/CashIcon";
import { ShopIcon } from "./icons/ShopIcon";
import { CalendarIcon } from "./icons/CalendarIcon";

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

export const EntryForm = () => {
  const onSubmit: SubmitHandler<iExpenseEntry> = async (data) => {
    const submitResponse: iExpenseResponse = await addExpenseEntry(data);

    if (submitResponse.status === 200) {
      reset();
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
          startContent={<ShopIcon />}
        />

        <Textarea
          className="mb-4"
          type="text"
          placeholder="brief description with card details"
          maxLength={100}
          minRows={2}
          maxRows={4}
          variant="bordered"
          {...register("description")}
        />
        <Input
          className="mb-4"
          type="date"
          placeholder="Expense Date"
          isInvalid={isInvalidElement("purchaseDate", errors.purchaseDate)}
          color={
            isInvalidElement("purchaseDate", errors.purchaseDate)
              ? "danger"
              : "default"
          }
          errorMessage={
            isInvalidElement("purchaseDate", errors.purchaseDate) && "Required"
          }
          startContent={<CalendarIcon />}
          {...register("purchaseDate", { required: true })}
        />

        <Button type="submit" color="primary" className="justify-center">
          Submit
        </Button>
      </form>
    </div>
  );
};
