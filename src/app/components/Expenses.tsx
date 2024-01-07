import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useStore } from "jotai";
import useSWR from "swr";

const TABLE_HEADERS = ["NAME", "PRICE", "PLACE", "DATE"];
const TABLE_ROWS = ["name", "price", "place", "purchaseDate"];

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
  const expenseAtom = useStore();

  const { data, error, isLoading } = useSWR("/api/expenses", {
    fetcher: (url) => fetch(url).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (data) return <div>{JSON.stringify(data)}</div>;

  // return (
  //   <Table aria-label="Example static collection table">
  //     {getTableHeaders()}
  //     <TableBody>
  //       <TableRow key="1">
  //         <TableCell>Tony Reichert</TableCell>
  //         <TableCell>CEO</TableCell>
  //         <TableCell>Active</TableCell>
  //         <TableCell>CEO</TableCell>
  //       </TableRow>
  //       <TableRow key="2">
  //         <TableCell>Zoey Lang</TableCell>
  //         <TableCell>Technical Lead</TableCell>
  //         <TableCell>Paused</TableCell>
  //         <TableCell>Technical Lead</TableCell>
  //       </TableRow>
  //       <TableRow key="3">
  //         <TableCell>Jane Fisher</TableCell>
  //         <TableCell>Senior Developer</TableCell>
  //         <TableCell>Active</TableCell>
  //         <TableCell>Senior Developer</TableCell>
  //       </TableRow>
  //       <TableRow key="4">
  //         <TableCell>William Howard</TableCell>
  //         <TableCell>Community Manager</TableCell>
  //         <TableCell>Vacation</TableCell>
  //         <TableCell>Community Manager</TableCell>
  //       </TableRow>
  //     </TableBody>
  //   </Table>
  // );
};
