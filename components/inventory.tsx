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
  entryDate: Date;
  quantity: number;
  price: number;
};

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "productId",
    header: "Product",
  },
  {
    accessorKey: "entryDate",
    header: "Entry Date",
    cell: ({ row }) => {
      const date: string = row.getValue("entryDate");
      const formatted = format(date, "dd, MMMM, yyyy");
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];

export default function Inventory() {
  const data = [
    {
      id: "1",
      productId: "1",
      entryDate: new Date(),
      quantity: 10,
      price: 100,
    },
    {
      id: "2",
      productId: "2",
      entryDate: new Date(),
      quantity: 20,
      price: 200,
    },
  ];

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
