import Inventory from "@/components/inventory/card";
import Transactions from "@/components/transactions/card";
import Metrics from "@/components/metrics";
import Header from "@/components/header";

export default async function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Header />
        <Metrics />
        <Inventory />
        <Transactions />
      </main>
    </div>
  );
}
