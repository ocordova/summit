import { unstable_noStore as noStore } from "next/cache";

import { DataTable } from "../ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import getTransactions from "@/app/actions/get-transactions";
import { columns } from "./column";
import { Suspense } from "react";

async function GetTransactions() {
  noStore();
  const transactions = await getTransactions();
  const data = JSON.parse(JSON.stringify(transactions));
  console.log(data);
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
          <Suspense fallback={<div>Loading...</div>}>
            <GetTransactions />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
