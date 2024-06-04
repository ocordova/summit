"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getTransactions() {
  const transactions = await prisma.transaction.findMany({
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      transactionDate: "desc",
    },
  });
  return transactions;
}
