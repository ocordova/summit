"use client";
import { Inventory, Prisma, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product: Product = row.getValue("product");
      return <span>{product.name}</span>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "entryDate",
    header: "Entry Date",
    cell: ({ row }) => {
      const date = row.getValue("entryDate") as string;
      const dateObj = parseISO(date);
      const formatted = format(dateObj, "dd, MMM, yyyy HH:mm");
      return <span>{formatted}</span>;
    },
  },
];
