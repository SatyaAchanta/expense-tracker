import { Divider } from "@nextui-org/react";
import { ExpenseCard } from "./ExpenseCard";

export const ExpenseCards = (data: any) => {
  return (
    <div className="sm:block md:hidden">
      {data.expenses.map((expense) => {
        return (
          <div className="m-4" key={`div-${expense.id}`}>
            <ExpenseCard
              key={expense.id}
              purchase={expense.name}
              date={expense.purchaseDate}
              description={expense.description}
              price={expense.price}
              id={expense.id}
              place={expense.place}
            />
          </div>
        );
      })}
      {data.expenses.length === 0 && (
        <div className="flex justify-center">
          <h1 className="text-lg">No expenses Saved</h1>
        </div>
      )}
    </div>
  );
};
