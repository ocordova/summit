"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { format, parseISO } from "date-fns";

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard title="Total Profit" value={1000} />
      <MetricCard title="Avg Profit Sale" value={100} />
      <MetricCard title="Total Sales" value={100} />
      <MetricCard title="Total Revenue" value={100} />
      <MetricCard title="Total Cost" value={100} />
      <MetricCard title="Inventory Value" value={100} />
    </div>
  );
}
