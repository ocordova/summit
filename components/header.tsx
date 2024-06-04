import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="mx-auto grid w-full max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Inventory Management
        </h1>

        <div className="flex items-center gap-2 md:ml-auto">
          <Link href="/new">
            <Button size="sm">New Transaction</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
