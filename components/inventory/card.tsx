import { unstable_noStore as noStore } from "next/cache";
import { DataTable } from "../ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import getInventory from "@/app/actions/get-inventory";
import { Suspense } from "react";
import { columns } from "./columns";

async function GetInventory() {
  noStore();
  const inventory = await getInventory();
  const data = JSON.parse(JSON.stringify(inventory));
  return <DataTable columns={columns} data={data} />;
}

export default async function Inventory() {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <GetInventory />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
