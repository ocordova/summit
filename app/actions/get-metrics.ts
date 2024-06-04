"use server";
import { PrismaClient, Operation } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getMetrics() {
  const totalProfit = await prisma.transaction.aggregate({
    where: { operation: Operation.out },
    _sum: { profit: true },
  });

  const totalSales = await prisma.transaction.count({
    where: { operation: Operation.out },
  });

  const totalRevenue = await prisma.transaction.aggregate({
    where: { operation: Operation.out },
    _sum: { price: true },
  });

  const totalCosts = await prisma.transaction.aggregate({
    where: { operation: Operation.out },
    _sum: { costPrice: true },
  });

  const inventoryValue = await prisma.inventory.aggregate({
    _sum: {
      quantity: true,
      price: true,
    },
  });

  return {
    totalProfit: totalProfit._sum.profit || 0,
    averageProfitPerSale: Number(totalProfit._sum.profit) / totalSales || 0,
    totalSales,
    totalRevenue: totalRevenue._sum.price || 0,
    totalCosts: totalCosts._sum.costPrice || 0,
    inventoryValue:
      Number(inventoryValue._sum.price) *
        Number(inventoryValue._sum.quantity) || 0,
  };
}
