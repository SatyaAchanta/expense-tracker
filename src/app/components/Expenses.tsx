import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getUserExpenses } from "../utils/requests";
import { useEffect } from "react";
import { expenseStore, isNewExpenseSaved } from "../store/expense";
import { getDateInUserTimezone } from "../utils/date";

const TABLE_HEADERS = ["DATE", "NAME", "PRICE", "PLACE"];
const TABLE_ROWS = ["purchaseDate", "name", "price", "place"];

const getTableHeaders = () => {
  return (
    <TableHeader>
      {TABLE_HEADERS.map((header) => {
        return <TableColumn key={header}>{header}</TableColumn>;
      })}
    </TableHeader>
  );
};

export const Expenses = () => {
  const { expenses, isLoading, isError } = getUserExpenses();
  const [, setUpdateExpenses] = React.useState(false);

  useEffect(() => {
    if (expenseStore.get(isNewExpenseSaved)) {
      setUpdateExpenses(true);
    }
  }, [expenseStore.get(isNewExpenseSaved)]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (expenses) {
    return (
      <Table aria-label="Example static collection table">
        {getTableHeaders()}
        <TableBody>
          {expenses.data.map((expense) => {
            return (
              <TableRow key={expense.id}>
                {TABLE_ROWS.map((row) => {
                  if (row === "purchaseDate") {
                    return (
                      <TableCell key={expense.id + row}>
                        {getDateInUserTimezone(new Date(expense[row]))}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={expense.id + row}>
                        {expense[row]}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
};
