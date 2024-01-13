"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserButton } from "@clerk/nextjs";
import { addExpenseEntry } from "../utils/api";
import { Button } from "@nextui-org/button";
import { Input, Textarea, Card, CardBody } from "@nextui-org/react";
import { useStore } from "jotai";
import { isNewExpenseSaved } from "../store/expense";
import { Expenses } from "../components/Expenses";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { iExpenseEntry, iExpenseResponse } from "@/types";

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

const Dashboard = () => {
  const expenseStore = useStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<iExpenseEntry> = async (data) => {
    console.log(`data`, data);
    const submitResponse: iExpenseResponse = await addExpenseEntry(data);

    console.log(`submitResponse`, submitResponse);
    if (submitResponse.status === 200) {
      console.log("Yes new expenses saved");
      expenseStore.set(isNewExpenseSaved, true);
      reset();
    }
  };

  return (
    <>
      <header className="flex w-full items-center justify-end bg-sky-900 px-6 py-6 border-b">
        <UserButton />
      </header>
      <div className="grid grid-cols-12 gap-x-8 py-10 text-black bg-white h-full w-full">
        <div className="col-span-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-auto ml-8">
            {expenseStore.get(isNewExpenseSaved) && (
              <Card
                className="w-80 mb-4"
                style={{ backgroundColor: "#0071bc", color: "white" }}
              >
                <CardBody>
                  <p>Changes Saved</p>
                </CardBody>
              </Card>
            )}
            <Input
              className="mb-4"
              type="text"
              placeholder="Expense Name"
              isInvalid={isInvalidElement("name", errors.name)}
              {...register("name", { required: true, maxLength: 40 })}
              errorMessage={isInvalidElement("name", errors.name) && "Required"}
              color={
                isInvalidElement("name", errors.name) ? "danger" : "default"
              }
            />

            <Input
              className="mb-4"
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              isInvalid={errors.price?.message !== undefined ? true : false}
              color={
                isInvalidElement("price", errors.price) ? "danger" : "default"
              }
              errorMessage={
                isInvalidElement("price", errors.price) && "Required"
              }
            />

            <Input
              className="mb-4"
              type="text"
              placeholder="Place"
              {...register("place", { required: true })}
              isInvalid={isInvalidElement("place", errors.place)}
              color={
                isInvalidElement("place", errors.place) ? "danger" : "default"
              }
              errorMessage={
                isInvalidElement("place", errors.place) && "Required"
              }
            />

            <Textarea
              className="mb-4"
              type="text"
              placeholder="brief description"
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
                isInvalidElement("purchaseDate", errors.purchaseDate) &&
                "Required"
              }
              {...register("purchaseDate", { required: true })}
            />

            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </div>
        <div className="ml-8 mr-8 col-span-8">
          <Expenses />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
