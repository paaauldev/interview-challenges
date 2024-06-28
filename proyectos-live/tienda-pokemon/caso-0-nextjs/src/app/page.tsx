"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import api from "@/api";
import { type Pokemon } from "@/types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    api.list().then(setPokemons);
  }, []);

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
            <div>
              <p>{pokemon.name}</p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn">Agregar</button>
          </article>
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">0 items</button>
      </aside>
    </>
  );
}

export default App;
