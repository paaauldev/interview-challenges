"use client";
import type { Item } from "./types";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    if (!event.target.text.value) return;
    setItems((items) =>
      items.concat({
        id: +new Date(),
        completed: false,
        text: event.target.text.value,
      }),
    );

    event.target.text.value = "";
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="mt-5 flex h-full w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <main className="grid h-full w-full place-content-center p-6">
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input className="rounded-xl border p-1" name="text" type="text" />
        <Button variant="ghost">Add</Button>
      </form>
      <ul>
        {items.map((item) => (
          <div key={item.id} onClick={() => handleToggle(item.id)}>
            <li key={item.id} className={item.completed ? "line-through" : ""}>
              {item.text} <Button onClick={() => handleRemove(item.id)}>[X]</Button>
            </li>
          </div>
        ))}
      </ul>
    </main>
  );
}

export default App;
