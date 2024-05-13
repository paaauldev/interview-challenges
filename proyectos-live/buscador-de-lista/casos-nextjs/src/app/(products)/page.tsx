"use client";
import type { Product } from "@/types";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import api from "@/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductCard from "./product-card";

type SortType = "NAME" | "PRICE";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<SortType>("NAME");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await api.search();

        setProducts(productsData);
      } catch (error) {
        console.log("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await api.search(query);

        setProducts(productsData);
      } catch (error) {
        console.log("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "NAME") result.sort((a, b) => a.title.localeCompare(b.title));

    if (sort === "PRICE") result.sort((a, b) => a.price - b.price);

    return result;
  }, [products, sort]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <main className="flex max-w-screen-lg flex-col items-center justify-center gap-4 text-center">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-2xl">Tienda digitaloncy</h1>
        <div className="flex w-auto flex-row justify-between">
          <Select
            defaultValue={sort}
            onValueChange={(e) => {
              setSort(e.toString() as SortType);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={sort} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="NAME">Name</SelectItem>
                <SelectItem value="PRICE">Price</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="w-1/4"
            name="text"
            placeholder="tv"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            description={product.description}
            id={product.id}
            price={product.price}
            title={product.title}
          />
        ))}
      </div>
    </main>
  );
}
