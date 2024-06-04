"use client";
import { Product, Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { parseISO, format } from "date-fns";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("transactionDate") as string;
      const dateObj = parseISO(date);
      const formatted = format(dateObj, "dd, MMM, yyyy HH:mm");
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product: Product = row.getValue("product");
      return <span>{product.name}</span>;
    },
  },
  {
    accessorKey: "operation",
    header: "Operation",
    cell: ({ row }) => {
      const operation = row.getValue("operation") as string;
      return (
        <Badge variant={operation === "in" ? "in" : "out"}>
          {operation === "in" ? "In" : "Out"}
        </Badge>
      );
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
    accessorKey: "purchasePrice",
    header: "Purchase Price",
    cell: ({ row }) => {
      const purchasePrice = row.getValue("purchasePrice") as number;
      if (purchasePrice === null) {
        return <span></span>;
      }
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(purchasePrice);
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => {
      const profit = row.getValue("profit") as number;
      if (profit === null) {
        return <span></span>;
      }
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);
      return <span>{formatted}</span>;
    },
  },
];
