import OrderCard from "./OrderCard";

const OrdersList = ({ orders }) => {
  if (orders.length === 0) {
    return <p className="muted">No valid orders to display.</p>;
  }

  return (
    <ul className="orders-list">
      {orders.map((order) => (
        <OrderCard key={order.orderid} order={order} />
      ))}
    </ul>
  );
};

export default OrdersList;
