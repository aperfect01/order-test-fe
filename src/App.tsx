import { useState } from "react";
import { Summary } from "./components/Summary";
import { Orders } from "./components/Orders";
import { OrderForm } from "./components/OrderForm";
import { useSummary } from "./hooks/useSummary";

function App() {
  const { refetch: refetchSummary } = useSummary();
  const [refreshOrdersKey, setRefreshOrdersKey] = useState(0);

  const handleRefresh = () => {
    refetchSummary();
    setRefreshOrdersKey((k) => k + 1);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Summary />
      <hr />
      <Orders key={refreshOrdersKey} />
      <hr />
      <OrderForm onSuccess={handleRefresh} />
    </div>
  );
}

export default App;
