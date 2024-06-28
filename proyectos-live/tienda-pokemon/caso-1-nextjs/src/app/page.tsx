"use client";
import type { Pokemon } from "@/types";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import { POKEMONS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [cartValue, setCartValue] = useState<number>(0);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(POKEMONS);

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");

    if (savedFavourites) {
      const favourites = JSON.parse(savedFavourites);

      setFilteredPokemons(
        POKEMONS.map((pokemon) => ({
          ...pokemon,
          isFavourite: favourites.includes(pokemon.id),
        })),
      );
    }
  }, []);

  const handleClick = (pokemon: Pokemon) => {
    if (cartValue > 10 || cartValue + pokemon.price > 10) return;
    setCart(cart.concat(pokemon));
    setCartValue(cartValue + pokemon.price);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredPokemons(POKEMONS.filter((pokemon) => pokemon.name.includes(e.target.value)));
  };

  const handleFavourite = (id: string) => {
    const updatedPokemons = filteredPokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return { ...pokemon, isFavourite: !pokemon.isFavourite };
      }

      return pokemon;
    });

    setFilteredPokemons(updatedPokemons);

    const favouriteIds = updatedPokemons
      .filter((pokemon) => pokemon.isFavourite)
      .map((pokemon) => pokemon.id);

    localStorage.setItem("favourites", JSON.stringify(favouriteIds));
  };

  return (
    <>
      <nav>
        <Input
          id="name_field"
          placeholder="Charmander"
          type="text"
          onChange={(e) => handleInputChange(e)}
        />
      </nav>
      <section>
        {filteredPokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure>
              <Image
                alt="Pokemon image"
                className="object-contain"
                height={100}
                src={pokemon.image}
                width={100}
              />
            </figure>
            <div>
              <Heart
                fill={pokemon.isFavourite ? "red" : "transparent"}
                height={40}
                width={40}
                onClick={() => handleFavourite(pokemon.id)}
              />
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <Button onClick={() => handleClick(pokemon)}>Agregar</Button>
          </article>
        ))}
      </section>
      <aside>
        <Button>
          {cart.length} items (total ${cartValue})
        </Button>
      </aside>
    </>
  );
}

export default App;
