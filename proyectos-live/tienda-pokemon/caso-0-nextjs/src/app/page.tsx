"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import api from "@/api";
import { type Pokemon } from "@/types";
import { Button } from "@/components/ui/button";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    api
      .list()
      .then(setPokemons)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Cargando...</p>;

  const handleClick = () => {
    if (items >= 3) return;
    setItems((prev) => prev + 1);
  };

  return (
    <>
      <section className="grid flex-1 gap-3 p-4">
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <Image
              alt="Pokemon image"
              className="object-contain"
              height={100}
              src={pokemon.image}
              width={100}
            />
            {console.log({ pokemon })}
            <div>
              <p>
                {pokemon.name} {pokemon.price}$
              </p>
              <p>{pokemon.description}</p>
            </div>
            <Button onClick={handleClick}>Agregar</Button>
          </article>
        ))}
      </section>
      <aside>
        <Button>{items} items</Button>
      </aside>
    </>
  );
}

export default App;
