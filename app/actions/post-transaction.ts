"use server";
import { PrismaClient, Operation } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
      const totalAvailableQuantity = await prisma.inventory.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          productId,
        },
      });

      if (totalAvailableQuantity === null) {
        throw new Error(
          `Not enough quantity available to fulfill the sale of ${quantity} units.`,
        );
      }

      const productEntries = await prisma.inventory.findMany({
        where: {
          productId,
        },
        orderBy: {
          entryDate: "asc",
        },
      });

      let quantityLeftToSell = quantity;
      let totalProfit = 0;
      let totalSellingPrice = 0;
      let totalCostPrice = 0;

      for (const entry of productEntries) {
        if (quantityLeftToSell <= 0) break;

        const quantityInThisEntry = entry.quantity;
        const purchasePricePerUnit = Number(entry.price); // Cast entry.price as a number

        const quantityToSellFromThisEntry = Math.min(
          quantityLeftToSell,
          quantityInThisEntry,
        );
        const sellingPriceForUnitsSold = quantityToSellFromThisEntry * price;
        const purchasePriceForUnitsSold =
          quantityToSellFromThisEntry * purchasePricePerUnit;

        const profitForUnitsSold =
          sellingPriceForUnitsSold - purchasePriceForUnitsSold;
        totalProfit += profitForUnitsSold;
        totalSellingPrice += sellingPriceForUnitsSold;
        totalCostPrice += purchasePriceForUnitsSold;

        console.log(
          `Sold ${quantityToSellFromThisEntry} units of product with ID ${productId} from entry with cost price $${purchasePricePerUnit} and selling price $${price}.`,
        );

        const remainingQuantity =
          quantityInThisEntry - quantityToSellFromThisEntry;
        if (remainingQuantity === 0) {
          await prisma.inventory.delete({
            where: { id: entry.id },
          });
        } else {
          await prisma.inventory.update({
            where: { id: entry.id },
            data: { quantity: remainingQuantity },
          });
        }

        await prisma.transaction.create({
          data: {
            productId,
            transactionDate: new Date(),
            operation: Operation.out,
            quantity: quantityToSellFromThisEntry,
            price: price,
            purchasePrice: purchasePricePerUnit,
            profit: profitForUnitsSold,
          },
        });

        quantityLeftToSell -= quantityToSellFromThisEntry;
      }

      console.log(
        `Successfully sold ${quantity} units of product with ID ${productId}. Total profit: $${totalProfit.toFixed(2)}.`,
      );
    }

    revalidatePath("/");
  });
}
