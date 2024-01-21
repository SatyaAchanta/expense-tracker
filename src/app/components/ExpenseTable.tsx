import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
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

export const ExpenseTable = (data: any) => {
  return (
    <div className="hidden md:block">
      <Table aria-label="Example static collection table">
        {getTableHeaders()}
        <TableBody>
          {data.expenses.map((expense) => {
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
    </div>
  );
};
