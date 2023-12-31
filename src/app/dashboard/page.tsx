"use client";

import { UserButton } from "@clerk/nextjs";
import { addExpenseEntry } from "../utils/api";

const Dashboard = () => {
  const submitEntry = (event: any) => {
    event?.preventDefault();
    console.log("----- before adding expense entry");
    addExpenseEntry();
  };

  return (
    <>
      <header className="flex w-full items-center justify-end bg-sky-900 px-10 py-6">
        <UserButton />
      </header>
      <div className="grid grid-cols-6 items-stretch gap-6 py-10 text-black bg-white h-full w-full">
        <div className="col-span-3 m-4">
          <form className="items-end" onSubmit={submitEntry}>
            <input
              type="text"
              className="mb-4 w-full rounded border-2 px-4 py-2"
              placeholder="expense"
              name="expense"
            />
            <input
              type="text"
              className="mb-4 w-full rounded border-2 px-4 py-2"
              placeholder="place of purchase"
            />
            <input
              type="text"
              className="mb-4 w-full rounded border-2 px-4 py-2"
              placeholder="details"
            />
            <input
              type="number"
              className="mb-4 w-full rounded border-2 px-4 py-2"
              placeholder="price"
            />
            <input
              type="date"
              className="mb-4 w-full rounded border-2 px-4 py-2"
              placeholder="date"
            />
            <button
              type="submit"
              className="rounded-full bg-sky-900 px-6 py-2"
              style={{ color: "white" }}
            >
              Save
            </button>
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
