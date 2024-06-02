"use client";
import type { Item } from "./types";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import api from "./api";

function App() {
  const [items, setItems] = useState<Item[] | null>([]);

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  const handleClick = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    );
  };

  return (
    <main className="grid h-full w-full place-content-center p-6">
      <h1>Supermarket list</h1>
      <form>
        <input autoFocus name="text" type="text" />
        <Button>Add</Button>
      </form>
      <ul>
        {items
          ? items.map((item) => (
              <li key={item.id} className={item.completed ? "line-through" : ""}>
                {item.text} <Button onClick={() => handleClick(item.id)}>X</Button>
              </li>
            ))
          : null}
      </ul>
    </main>
  );
}

export default App;
