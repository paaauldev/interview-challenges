import { type Product } from "@/types";

export default function ProductCard({ id, description, price, title }: Product) {
  return (
    <div className="p-4">
      <h4>Producto: {title}</h4>
      <p>Descripcion: {description}</p>
      <span>$ {price}</span>
    </div>
  );
}
