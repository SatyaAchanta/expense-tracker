"use client";

import { UserButton } from "@clerk/nextjs";
import { addExpenseEntry } from "../utils/api";
import { Input, Textarea, Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { Expenses } from "../components/Expenses";
import { EntryForm } from "../components/EntryForm";

const Dashboard = () => {
  return (
    <div>
      <header className="flex w-full items-center justify-end px-6 py-6 border-b">
        <UserButton />
      </header>
      <div className="grid mt-16">
        <Tabs className="md:hidden justify-center">
          <Tab title="Add Expense" className="md:hidden">
            <EntryForm />
          </Tab>
          <Tab title="View Expenses" className="md:hidden">
            <Expenses />
          </Tab>
        </Tabs>
      </div>
      <div className="hidden md:grid grid-cols-12 md:gap-x-8 py-10 text-black bg-white h-full w-full">
        <div className="col-span-12 mx-4 md:mx-0 md:col-span-4">
          <EntryForm />
        </div>
        <div className="col-span-12 md:col-span-8 m-2 md:ml-10">
          <Expenses />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
