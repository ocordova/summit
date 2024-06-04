"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getInventory() {
  const inventory = await prisma.inventory.findMany({
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      entryDate: "asc",
    },
  });

  return inventory;
}
