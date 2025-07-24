import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";

interface Order {
  id: string;
  product: string;
  qty: number;
  price: number;
}

export function useOrders() {
  const limit = 5; // Number of orders per page
  const [page, setPage] = useState(1);
  const [productFilter, setProductFilter] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient(`/orders?product=${productFilter}&offset=${(page - 1) * limit}&limit=${limit}`);
      setOrders(result.data);
      setTotalPages(Math.ceil((result.total + 1) / limit));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [productFilter, page]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    totalPages,
    filters: { product: productFilter },
    page,
    setPage,
    setProductFilter,
  };
}
