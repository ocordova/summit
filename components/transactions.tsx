"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { format, parseISO } from "date-fns";

export type Inventory = {
  id: string;
  productId: string;
  transactionDate: Date;
  operation: string;
  quantity: number;
  price: number;
  costPrice: number;
};

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "productId",
    header: "Product",
  },
  {
    accessorKey: "transactionDate",
    header: "Entry Date",
    cell: ({ row }) => {
      const date: string = row.getValue("transactionDate");
      const formatted = format(date, "dd, MMMM, yyyy");
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "operation",
    header: "Operation",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
  },
];

export default function Transactions() {
  const data = [
    {
      id: "1",
      productId: "1",
      transactionDate: new Date(),
      operation: "Purchase",
      quantity: 10,
      price: 100,
      costPrice: 90,
    },
    {
      id: "2",
      productId: "2",
      transactionDate: new Date(),
      operation: "Sale",
      quantity: 20,
      price: 200,
      costPrice: 180,
    },
  ];

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
