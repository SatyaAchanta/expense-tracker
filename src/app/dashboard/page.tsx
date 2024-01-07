"use client";

import { UserButton } from "@clerk/nextjs";
import { addExpenseEntry } from "../utils/api";
import { Button } from "@nextui-org/button";
import { Input, Textarea, Card, CardBody } from "@nextui-org/react";
import { useStore, useAtom } from "jotai";
import { expenseAtom, isNewExpenseSaved } from "../store/expense";
import { Expenses } from "../components/Expenses";
import { useForm, SubmitHandler } from "react-hook-form";
import { iExpenseEntry, iExpenseResponse } from "@/types";

const Dashboard = () => {
  const expenseStore = useStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<iExpenseEntry>();

  const onSubmit: SubmitHandler<iExpenseEntry> = async (data) => {
    console.log(`data`, data);
    const submitResponse: iExpenseResponse = await addExpenseEntry(data);

    console.log(`submitResponse`, submitResponse);
    if (submitResponse.status === 200) {
      expenseStore.set(isNewExpenseSaved, true);
      expenseStore.set(expenseAtom, "Changes Saved");
    }
  };

  return (
    <>
      <header className="flex w-full items-center justify-end bg-sky-900 px-10 py-6 border-b">
        <UserButton />
      </header>
      <div className="grid grid-cols-6 items-stretch gap-6 py-10 text-black bg-white h-full w-full">
        <div className="col-span-3 m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="ml-8">
            {expenseStore.get(isNewExpenseSaved) && (
              <Card
                className="w-80 mb-4"
                style={{ backgroundColor: "#0071bc", color: "white" }}
              >
                <CardBody>
                  <p>{expenseStore.get(expenseAtom)}</p>
                </CardBody>
              </Card>
            )}
            <Input
              className="w-80 mb-4"
              type="text"
              placeholder="Expense Name"
              {...register("name", { required: true })}
            />
            <Input
              className="w-80 mb-4"
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
            />

            <Input
              className="w-80 mb-4"
              type="text"
              placeholder="Place"
              {...register("place", { required: true })}
            />
            <Textarea
              className="w-80 mb-4"
              type="text"
              placeholder="brief description"
              maxLength={100}
              minRows={2}
              maxRows={4}
              variant="bordered"
              {...register("description", { required: true })}
            />
            <Input
              className="w-80 mb-4"
              type="date"
              placeholder="Expense Date"
              {...register("purchaseDate", { required: true })}
            />

            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </div>
        <div className="col-span-3">
          <Expenses />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
