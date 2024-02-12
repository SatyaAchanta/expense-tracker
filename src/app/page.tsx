import { auth } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Provider } from "jotai";
import Link from "next/link";
import { expenseStore } from "./store/expense";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "new-user" : "/sign-in";

  return (
    <>
      <div className="md:hidden h-screen  flex justify-center items-center  font-serif">
        <div className="w-full md:max-w-[600px] m-4 md:m-0">
          <div className="px-4 py-6 md:p-0">
            <h1 className="text-4xl mb-4">
              Empower your finances with BudgetMingle
            </h1>
            <p className="text-2xl mb-4">
              Your personal money manager for free
            </p>
          </div>
          <Link href={href} className="px-4 md:px-0">
            <Button size="lg" color="danger" variant="solid">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex justify-center h-screen items-center">
        <label className="text-3xl font-serif">
          OOPS. We are only for mobile devices. Please visit us from mobile
          screen
        </label>
      </div>
    </>
  );
}
