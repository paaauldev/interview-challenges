"use client";
import type { Product } from "@/types";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import api from "@/api";
import { Input } from "@/components/ui/input";

import ProductCard from "./product-card";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center text-center">
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-2xl">Tienda digitaloncy</h1>
        <Input
          name="text"
          placeholder="tv"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
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
