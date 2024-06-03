import { PrismaClient, Operation } from "@prisma/client";

const prisma = new PrismaClient();

interface TransactionInput {
  productId: string;
  quantity: number;
  price: number;
  operation: Operation;
}

export default async function postTransaction({
  productId,
  quantity,
  price,
  operation,
}: TransactionInput) {
  return await prisma.$transaction(async (prisma) => {
    // In operation
    if (operation === Operation.in) {
      await prisma.transaction.create({
        data: {
          productId: productId,
          transactionDate: new Date(),
          operation,
          quantity,
          price,
        },
      });
      await prisma.inventory.create({
        data: {
          productId,
          entryDate: new Date(),
          quantity,
          price,
        },
      });
    }

    // Out operation
    if (operation === Operation.out) {
      let remainingQuantity = quantity;
      let totalCost = 0;

      const inventoryEntries = await prisma.inventory.findMany({
        where: {
          productId,
          quantity: {
            gt: 0,
          },
        },
        orderBy: {
          entryDate: "asc",
        },
      });

      for (const entry of inventoryEntries) {
        if (remainingQuantity <= 0) break;

        const availableQuantity = entry.quantity;

        if (availableQuantity >= remainingQuantity) {
          const costPrice = remainingQuantity * Number(entry.price);
          totalCost += costPrice;
          await prisma.inventory.update({
            where: { id: entry.id },
            data: { quantity: availableQuantity - remainingQuantity },
          });
          remainingQuantity = 0;
        } else {
          const costPrice = availableQuantity * Number(entry.price);
          totalCost += costPrice;
          await prisma.inventory.update({
            where: { id: entry.id },
            data: { quantity: 0 },
          });
          remainingQuantity -= availableQuantity;
        }
      }

      const profit = price * quantity - totalCost;
      await prisma.transaction.create({
        data: {
          productId,
          transactionDate: new Date(),
          operation,
          quantity,
          price,
          costPrice: totalCost / quantity,
          profit,
        },
      });
    }
  });
}
