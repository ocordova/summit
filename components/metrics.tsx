import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { unstable_noStore as noStore } from "next/cache";
import getMetrics from "@/app/actions/get-metrics";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

function MetricCard({
  title,
  value,
  isMoney,
}: {
  title: string;
  value: number;
  isMoney?: boolean;
}) {
  // Format thousand separator and decimal places
  const formattedValue = isMoney
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    : new Intl.NumberFormat("en-US").format(value);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
      </CardContent>
    </Card>
  );
}

async function GetMetrics() {
  noStore();
  const metrics = await getMetrics();
  const {
    totalUnitsSold,
    averagePrice,
    inventoryCount,
    totalProfit,
    inventoryValue,
    totalRevenue,
  } = metrics;

  return (
    <div>
      <div className="mb-4 font-semibold leading-none tracking-tight">
        Financial Metrics
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard isMoney title="Total Revenue" value={totalRevenue} />
        <MetricCard isMoney title="Total Profit" value={totalProfit} />
        <MetricCard title="Total Units Sold" value={totalUnitsSold} />
      </div>
      <div className="mb-4 mt-8 font-semibold leading-none tracking-tight">
        Inventory Metrics
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Inventory Count" value={inventoryCount} />
        <MetricCard isMoney title="Inventory Value" value={inventoryValue} />
        <MetricCard isMoney title="Average Price" value={averagePrice} />
      </div>
    </div>
  );
}

const LoadingMarkup = (
  <>
    <Skeleton className="h-5 w-[8rem] rounded-xl" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
    </div>
    <Skeleton className="h-5 w-[8rem] rounded-xl" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
    </div>
  </>
);

export default async function Metrics() {
  return (
    <Suspense fallback={<>{LoadingMarkup}</>}>
      <GetMetrics />
    </Suspense>
  );
}
