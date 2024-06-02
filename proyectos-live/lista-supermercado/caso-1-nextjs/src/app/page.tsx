"use client";
import type { Item } from "./types";

import { useEffect, useState } from "react";
import { Loader, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [inputContent, setInputContent] = useState("");

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    const newItem = {
      id: items.length + 1,
      text: event.target.text.value,
      completed: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setInputContent("");
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  if (!items.length)
    return (
      <div className="mt-5 flex h-full w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <main className="grid h-full w-full place-content-center p-6">
      <h1>Supermarket list</h1>
      <form className="m-2" onSubmit={handleAdd}>
        <input
          className="rounded-xl border p-1"
          name="text"
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
        <Button variant="ghost">Add</Button>
      </form>
      <ul>
        {items.map((item) => (
          <div key={item.id} onClick={() => handleToggle(item.id)}>
            <li className={item.completed ? "line-through" : ""}>
              {item.text} <Button onClick={() => handleRemove(item.id)}>[X]</Button>
            </li>
          </div>
        ))}
      </ul>
    </main>
  );
}

export default App;
