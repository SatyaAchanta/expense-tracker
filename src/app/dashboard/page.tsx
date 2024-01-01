"use client";

import { useRef } from "react";
import { UserButton } from "@clerk/nextjs";
import { addExpenseEntry } from "../utils/api";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";

const Dashboard = () => {
  const expenseName = useRef();
  const price = useRef();
  const place = useRef();
  const description = useRef();
  const expenseDate = useRef<Date>(new Date());

  const submitEntry = (event: any) => {
    event?.preventDefault();

    const data = {
      name: expenseName.current.value,
      price: price.current.value,
      place: place.current.value as number,
      description: description.current.value,
      purchaseDate: expenseDate.current.value,
    };

    addExpenseEntry(data);
  };

  return (
    <>
      <header className="flex w-full items-center justify-end bg-sky-900 px-10 py-6">
        <UserButton />
      </header>
      <div className="grid grid-cols-6 items-stretch gap-6 py-10 text-black bg-white h-full w-full">
        <div className="col-span-3 m-4">
          <form className="items-end ml-4" onSubmit={submitEntry}>
            <Input
              type="text"
              className="mb-4 w-full"
              ref={expenseName}
              label="expense"
              name="expense"
            />
            <Input
              type="text"
              className="mb-4 w-full"
              ref={place}
              label="place of purchase"
            />
            <Input
              type="text"
              className="mb-4 w-full"
              ref={description}
              label="details"
            />
            <Input
              type="number"
              className="mb-4 w-full"
              ref={price}
              label="Price"
            />
            <Input
              type="date"
              className="mb-4 w-full"
              ref={expenseDate}
              label="Purchase Date"
            />

            <Button type="Submit" color="primary">
              Save Me
            </Button>
          </form>
        </div>
        <div className="col-span-3">
          <h1>Table goes here. WIP</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
