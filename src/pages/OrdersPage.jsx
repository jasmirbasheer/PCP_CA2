import OrderForm from "../components/OrderForm";
import OrdersList from "../components/OrdersList";
import { useOrders } from "../hooks/useOrders";

const OrdersPage = () => {
  const { orders, loading, error } = useOrders();

  return (
    <section>
      <div className="page-header">
        <h1>Food Delivery Orders</h1>
        <p className="muted">Single source of truth: Context + Reducer</p>
      </div>

      <OrderForm />

      <div className="panel">
        {loading ? <p>Loading orders...</p> : null}
        {error ? <p>{error}</p> : null}
        {!loading && !error ? <OrdersList orders={orders} /> : null}
      </div>
    </section>
  );
};

export default OrdersPage;
