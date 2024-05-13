import { type Product } from "@/types";

export default function ProductCard({ id, description, price, title }: Product) {
  return (
    <div key={id} className="p-4">
      <h4>Producto: {title}</h4>
      <p>Descripcion: {description}</p>
      <span className={price < 100 ? "sale" : ""}>$ {price}</span>
    </div>
  );
}
