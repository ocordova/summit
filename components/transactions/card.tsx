import { unstable_noStore as noStore } from "next/cache";

import { DataTable } from "../ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import getTransactions from "@/app/actions/get-transactions";
import { columns } from "./column";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

async function GetTransactions() {
  noStore();
  const transactions = await getTransactions();
  const data = JSON.parse(JSON.stringify(transactions));
  return <DataTable columns={columns} data={data} />;
}

export default function Transactions() {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-2">
                <Skeleton className="h-4 rounded-xl" />
                <Skeleton className="h-4 rounded-xl" />
                <Skeleton className="h-4 rounded-xl" />
              </div>
            }
          >
            <GetTransactions />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
