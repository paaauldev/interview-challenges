"use client"
import type {Item} from "./types";

import {useEffect, useState} from "react";


import api from "./api";

function App() {
  const [items, setItems] = useState<Item[] | null>([]);

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  return (
    <main>
      <h1>Supermarket list</h1>
      <form>
        <input name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li >
            {item.text} <button>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
