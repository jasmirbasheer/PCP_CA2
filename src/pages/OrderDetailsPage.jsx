import { Link, useParams } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { orders, updateOrderRating, updateOrderStatus, deleteOrder } =
    useOrders();

  const order = orders.find((currentOrder) => currentOrder.orderid === id);

  if (!order) {
    return (
      <section className="panel">
        <h2>Order not found</h2>
        <Link to="/orders">Go back to orders</Link>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="page-header">
        <h1>Order #{order.orderid}</h1>
        <span className={`status-chip ${order.status}`}>{order.status}</span>
      </div>

      <p>
        <strong>Customer:</strong> {order.customerName}
      </p>
      <p>
        <strong>Restaurant:</strong> {order.restaurant}
      </p>
      <p>
        <strong>Delivery Time:</strong> {order.deliveryTime}
      </p>
      <p>
        <strong>Total:</strong> Rs. {order.totalAmount.toFixed(2)}
      </p>

      <div className="filters-grid">
        <label>
          Update Status
          <select
            value={order.status}
            onChange={(event) =>
              updateOrderStatus(order.orderid, event.target.value)
            }
          >
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="preparing">preparing</option>
            <option value="out_for_delivery">out_for_delivery</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </label>

        <label>
          Update Rating
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={order.rating ?? ""}
            onChange={(event) =>
              updateOrderRating(order.orderid, event.target.value)
            }
          />
        </label>
      </div>

      <div>
        <h3>Items</h3>
        <ul>
          {order.items.map((item) => (
            <li key={`${order.orderid}-${item.name}`}>
              {item.name} x {item.quantity} = Rs.{" "}
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="danger" onClick={() => deleteOrder(order.orderid)}>
          Delete Order
        </button>
        <Link to="/orders">
          <button className="secondary">Back to Orders</button>
        </Link>
      </div>
    </section>
  );
};

export default OrderDetailsPage;
