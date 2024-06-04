import NewTransaction from "@/components/new-transaction";
import getProducts from "./actions/get-products";
import Inventory from "@/components/inventory";
import Transactions from "@/components/transactions";
import Metrics from "@/components/metrics";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* <NewTransaction products={products} /> */}
        {/* <Inventory />
         */}
        {/* <Transactions /> */}
        <Metrics />
      </main>
    </div>
  );
}
