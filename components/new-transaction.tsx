"use client";
import { Product } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";

export default function NewTransaction({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Product</Label>
              <Select>
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[5rem] flex-col space-y-1.5">
              <Label htmlFor="operation">Operation</Label>
              <ToggleGroup type="single">
                <ToggleGroupItem
                  defaultChecked
                  value="in"
                  aria-label="Toggle in"
                >
                  In
                </ToggleGroupItem>
                <ToggleGroupItem value="out" aria-label="Toggle out">
                  Out
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Quantity</Label>
              <Input id="quantity" placeholder="4" type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="100" type="number" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div></div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
