/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";
import type { Product } from "@/types";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import api from "@/api";
import { Input } from "@/components/ui/input";

import ProductCard from "./product-card";

function Recommended() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.search().then(setProducts);
  }, []);

  const recommendedProducts = useMemo(() => {
    const result = [...products];

    return result.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 2);
  }, [products]);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-2xl">Productos recomendados</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            description={product.description}
            id={product.id}
            price={product.price}
            title={product.title}
          />
        ))}
      </div>
    </>
  );
}

function useDebounce(query: string, delay = 300) {
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timeout);
  }, [query, delay]);

  return debouncedQuery;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryDebounced = useDebounce(query, 300);

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
        const productsData = await api.search(queryDebounced);

        setProducts(productsData);
      } catch (error) {
        console.log("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [queryDebounced]);

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
          <Input
            className="w-1/4"
            name="text"
            placeholder="tv"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
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
      <Recommended />
    </main>
  );
}
