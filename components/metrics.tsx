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
  value: Prisma.Decimal | number;
  isMoney?: boolean;
}) {
  const formattedValue =
    isMoney && value instanceof Prisma.Decimal
      ? value.toNumber().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : value.toLocaleString("en-US");

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
    totalProfit,
    averageProfitPerSale,
    totalSales,
    totalRevenue,
    totalCosts,
    inventoryValue,
  } = metrics;

  return (
    <>
      <MetricCard isMoney title="Total Profit" value={totalProfit} />
      <MetricCard
        isMoney
        title="Avg Profit per Sale"
        value={averageProfitPerSale}
      />
      <MetricCard title="Total Sales" value={totalSales} />
      <MetricCard isMoney title="Total Revenue" value={totalRevenue} />
      <MetricCard isMoney title="Total Cost" value={totalCosts} />
      <MetricCard isMoney title="Inventory Value" value={inventoryValue} />
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
