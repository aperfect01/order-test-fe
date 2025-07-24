import { useState } from "react";
import { apiClient } from "../lib/apiClient";

export function OrderForm({ onSuccess }: { onSuccess: () => void }) {
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await apiClient("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, qty, price }),
    });

    console.log(res);

    if (res && res.id) {
      setProduct("");
      setQty(1);
      setPrice(0);
      onSuccess(); // Refresh orders and summary
    } else {
      alert("Failed to add order");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Add New Order</h2>
      <label>Product:</label>
      <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product" required />
      <label>Quantity:</label>
      <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} min="1" required />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} step="0.01" required />
      <button type="submit">Add Order</button>
    </form>
  );
}
