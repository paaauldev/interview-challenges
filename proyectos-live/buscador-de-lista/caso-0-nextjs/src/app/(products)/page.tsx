"use client";
import type { Product } from "@/types";

import { useEffect, useState } from "react";

import api from "@/api";

import ProductCard from "./product-card";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await api.search();

        setProducts(productsData);
      } catch (error) {
        console.log("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    api.search(query);
  }, [query]);

  return (
    <main className="flex flex-col items-center justify-center text-center">
      <div className="pb-4">
        <h1>Tienda digitaloncy</h1>
        <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target)} />
      </div>
      <div>
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
