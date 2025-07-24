import { useSummary } from "../hooks/useSummary";

export function Summary() {
  const { data, loading, error } = useSummary();

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No summary data available</p>;

  return (
    <div>
      <h2>Summary</h2>
      <p>Total Revenue: ${data.totalRevenue}</p>
      <p>Median Order Price: ${data.medianOrderPrice}</p>
      <p>Top Product by Quantity: {data.topProductByQty}</p>
    </div>
  );
}
