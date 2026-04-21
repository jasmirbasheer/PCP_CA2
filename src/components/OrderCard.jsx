import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <li className="order-item" data-testid="order-item">
      <div className="order-item-top">
        <div>
          <h3>Order #{order.orderid}</h3>
          <p className="muted">
            {order.customerName} · {order.restaurant}
          </p>
        </div>
        <span className={`status-chip ${order.status}`}>{order.status}</span>
      </div>

      <p className="muted">Total: Rs. {order.totalAmount.toFixed(2)}</p>
      <Link to={`/orders/${encodeURIComponent(order.orderid)}`}>
        View details
      </Link>
    </li>
  );
};

export default OrderCard;
