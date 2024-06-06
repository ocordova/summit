"use client";
import { Product } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newTransactionSchema } from "@/schemas/new-transaction";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import Link from "next/link";
import postTransaction from "@/app/actions/post-transaction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewTransaction({ products }: { products: Product[] }) {
  const router = useRouter();
  const defaultFirstProduct = products[0].id;

  const form = useForm<z.infer<typeof newTransactionSchema>>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      product: defaultFirstProduct,
      operation: "in",
      quantity: undefined,
      price: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof newTransactionSchema>) {
    const { product, operation, quantity, price } = values;

    await postTransaction({
      productId: product,
      operation,
      quantity,
      price,
    });

    toast.success("Transaction has been added successfully");
    router.push("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="product">Product</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.product?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Operation</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0">
                        <FormControl>
                          <RadioGroupItem value="in" id="in" />
                        </FormControl>
                        <FormLabel className="pl-2 font-normal" htmlFor="in">
                          In
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0">
                        <FormControl>
                          <RadioGroupItem value="out" id="out" />
                        </FormControl>
                        <FormLabel className="pl-2 font-normal" htmlFor="out">
                          Out
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.operation?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="quantity">Quantity</FormLabel>
                  <Input
                    id="quantity"
                    placeholder="4"
                    type="number"
                    {...field}
                  />
                  <FormMessage>
                    {form.formState.errors.quantity?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    id="price"
                    placeholder="100"
                    type="number"
                    {...field}
                  />
                  <FormMessage>
                    {form.formState.errors.price?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex justify-between py-4">
              <div></div>
              <div className="flex gap-2">
                <Link href="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
