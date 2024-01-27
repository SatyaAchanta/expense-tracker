"use client";

import { UserButton } from "@clerk/nextjs";
import { addExpenseEntry } from "../utils/api";
import { Tabs, Tab, Button, useDisclosure } from "@nextui-org/react";
import { Expenses } from "../components/Expenses";
import { EntryForm } from "../components/EntryForm";
import { AddIcon } from "../components/icons/AddIcon";
import { CashIcon } from "../components/icons/CashIcon";
import { SettingsIcon } from "../components/icons/SettingsIcon";
import { ActionModal } from "../components/ActionModal";
import { ExpenseForm } from "../components/ExpenseForm";
import BudgetDetails from "../components/BudgetDetails";
import { ProfileDetailsIcon } from "../components/icons/ProfileDetailsIcon";
import { BudgetSettings } from "../components/BudgetSettings";
import { PlusIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <div className="md:hidden">
        <header className="flex w-full items-center justify-between md:justify-end px-6 py-6 border-b">
          <UserButton />
          <PlusIcon className="h-6 w-6 md:hidden" onClick={onOpen} />
        </header>
        <div className="grid mt-8">
          <Tabs
            className="md:hidden justify-center"
            size="lg"
            variant="bordered"
            color="primary"
          >
            <Tab title={<ProfileDetailsIcon />} className="md:hidden">
              <BudgetDetails />
            </Tab>
            <Tab title={<CashIcon />} className="md:hidden">
              <Expenses />
            </Tab>
            <Tab title={<SettingsIcon />} className="md:hidden">
              <BudgetSettings />
            </Tab>
          </Tabs>
        </div>
        <div className="hidden md:grid grid-cols-12 md:gap-x-8 py-10 text-black bg-white h-full w-full">
          <div className="col-span-12 mx-4 md:mx-0 md:col-span-4">
            <ExpenseForm
              id=""
              name=""
              place=""
              price={0}
              description=""
              purchaseDate={new Date().toLocaleDateString()}
              closeModal={() => {
                return;
              }}
              isUpdate={false}
            />
          </div>
          <div className="col-span-12 md:col-span-8 m-2 md:ml-10">
            <Expenses />
          </div>
        </div>
      </div>
      <ActionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onModalClose={onClose}
        onModalAction={() => {
          return;
        }}
        actionButtonTitle="Add"
        header="Add Expense"
        body={
          <ExpenseForm
            id=""
            name=""
            place=""
            price={0}
            description=""
            purchaseDate={new Date().toLocaleDateString()}
            closeModal={onClose}
            isUpdate={false}
          />
        }
        isEdit={true}
      />
      <div className="hidden md:flex justify-center h-screen items-center">
        <label className="text-3xl font-serif">
          OOPS. We are only for mobile devices. Please visit us from mobile
          screen
        </label>
      </div>
    </>
  );
};

export default Dashboard;
