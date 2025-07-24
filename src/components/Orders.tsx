import { useState } from "react";
import { useOrders } from "../hooks/useOrders";

export function Orders() {
  const { orders, loading, error, totalPages, filters, page, setPage, setProductFilter } = useOrders();

  return (
    <div>
      <h2>Orders</h2>

      <input
        type="text"
        placeholder="Filter by product..."
        value={filters.product}
        onChange={(e) => {
          setProductFilter(e.target.value);
          setPage(1);
        }}
      />

      {loading && <p>Loading orders...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {orders?.map((order) => (
          <li key={order.id}>
            Name: {order.product} <br />
            Quantity: {order.qty} <br />
            Price: ${order.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
