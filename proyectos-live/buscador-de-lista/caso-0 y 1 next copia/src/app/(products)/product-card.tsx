import { type Product } from "@/types";

export default function ProductCard({ id, description, price, title }: Product) {
  return (
    <div
      key={id}
      className="flex cursor-pointer flex-col items-start rounded-xl border bg-slate-800 p-4"
    >
      <h4>Producto: {title}</h4>
      <p>Descripcion: {description}</p>
      <span>
        {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price)}
      </span>
    </div>
  );
}
