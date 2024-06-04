import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { unstable_noStore as noStore } from "next/cache";
import getMetrics from "@/app/actions/get-metrics";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: Prisma.Decimal | number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{Number(value)}</div>
      </CardContent>
    </Card>
  );
}

async function GetMetrics() {
  noStore();
  const metrics = await getMetrics();
  const {
    totalProfit,
    averageProfitPerSale,
    totalSales,
    totalRevenue,
    totalCosts,
    inventoryValue,
  } = metrics;

  return (
    <>
      <MetricCard title="Total Profit" value={totalProfit} />
      <MetricCard title="Avg Profit Sale" value={averageProfitPerSale} />
      <MetricCard title="Total Sales" value={totalSales} />
      <MetricCard title="Total Revenue" value={totalRevenue} />
      <MetricCard title="Total Cost" value={totalCosts} />
      <MetricCard title="Inventory Value" value={inventoryValue} />
    </>
  );
}

const LoadingMarkup = (
  <>
    <Skeleton className="h-24 rounded-xl" />
    <Skeleton className="h-24 rounded-xl" />
    <Skeleton className="h-24 rounded-xl" />
    <Skeleton className="h-24 rounded-xl" />
    <Skeleton className="h-24 rounded-xl" />
    <Skeleton className="h-24 rounded-xl" />
  </>
);

export default async function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<>{LoadingMarkup}</>}>
        <GetMetrics />
      </Suspense>
    </div>
  );
}
