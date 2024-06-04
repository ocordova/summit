"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}
