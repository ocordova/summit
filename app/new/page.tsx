import NewTransaction from "@/components/new-transaction";
import getProducts from "../actions/get-products";

export default async function NewTransactionPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto flex h-screen w-full max-w-xl items-center justify-center px-4">
      <NewTransaction products={products} />
    </div>
  );
}
