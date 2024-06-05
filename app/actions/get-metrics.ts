"use server";
import { PrismaClient, Operation } from "@prisma/client";

const prisma = new PrismaClient();

async function calculateAveragePrice() {
  const entries = await prisma.inventory.findMany({
    select: {
      quantity: true,
      price: true,
    },
  });

  const totalCost = entries.reduce((acc, entry) => {
    return acc + Number(entry.quantity) * Number(entry.price);
  }, 0);

  const totalQuantity = entries.reduce((acc, entry) => {
    return acc + entry.quantity;
  }, 0);

  if (totalQuantity === 0) {
    return 0;
  }

  return totalCost / totalQuantity;
}

async function calculateRevenue() {
  const transactions = await prisma.transaction.findMany({
    where: { operation: Operation.out },
  });

  const totalRevenue = transactions.reduce((sum, transaction) => {
    return sum + Number(transaction.price) * transaction.quantity;
  }, 0);

  return totalRevenue;
}

async function calculateInventoryValue() {
  const prisma = new PrismaClient();

  // Fetch all inventory items
  const inventoryItems = await prisma.inventory.findMany();

  // Calculate the total inventory value
  const inventoryValue = inventoryItems.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return inventoryValue;
}

export default async function getMetrics() {
  const averagePrice = await calculateAveragePrice();

  const totalUnitsSold = await prisma.transaction.aggregate({
    _sum: { quantity: true },
    where: { operation: Operation.out },
  });

  const inventoryCount = await prisma.inventory.aggregate({
    _sum: { quantity: true },
  });

  const totalProfit = await prisma.transaction.aggregate({
    _sum: { profit: true },
    where: { operation: Operation.out },
  });

  const inventoryValue = await calculateInventoryValue();

  const totalRevenue = await calculateRevenue();

  return {
    averagePrice,
    totalUnitsSold: totalUnitsSold._sum.quantity || 0,
    inventoryCount: inventoryCount._sum.quantity || 0,
    totalProfit: Number(totalProfit._sum.profit) || 0,
    inventoryValue: Number(inventoryValue) || 0,
    totalRevenue: Number(totalRevenue) || 0,
  };
}
