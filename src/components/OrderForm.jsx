import { useState } from "react";
import { useOrders } from "../hooks/useOrders";

const initialFormState = {
  orderid: "",
  customerName: "",
  restaurant: "",
  itemName: "",
  itemPrice: "",
  itemQuantity: "",
  status: "pending",
  deliveryTime: "",
  rating: "",
};

const OrderForm = () => {
  const { addOrder } = useOrders();
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      orderid: formState.orderid,
      customerName: formState.customerName,
      restaurant: formState.restaurant,
      items: [
        {
          name: formState.itemName,
          price: Number(formState.itemPrice),
          quantity: Number(formState.itemQuantity),
        },
      ],
      totalAmount: Number(formState.itemPrice) * Number(formState.itemQuantity),
      status: formState.status,
      deliveryTime: formState.deliveryTime,
      rating: formState.rating === "" ? null : Number(formState.rating),
    };

    const added = addOrder(newOrder);

    if (!added) {
      setFormError("Invalid or duplicate order. Please check your inputs.");
      return;
    }

    setFormError("");
    setFormState(initialFormState);
  };

  return (
    <form className="panel order-form" onSubmit={handleSubmit}>
      <div className="filters-grid">
        <label>
          Order ID
          <input
            name="orderid"
            value={formState.orderid}
            onChange={handleChange}
            placeholder="ORD-1001"
            required
          />
        </label>

        <label>
          Customer Name
          <input
            name="customerName"
            value={formState.customerName}
            onChange={handleChange}
            placeholder="Customer"
            required
          />
        </label>

        <label>
          Restaurant
          <input
            name="restaurant"
            value={formState.restaurant}
            onChange={handleChange}
            placeholder="Restaurant"
            required
          />
        </label>
      </div>

      <div className="filters-grid">
        <label>
          Item Name
          <input
            name="itemName"
            value={formState.itemName}
            onChange={handleChange}
            placeholder="Burger"
            required
          />
        </label>

        <label>
          Item Price
          <input
            name="itemPrice"
            type="number"
            min="1"
            value={formState.itemPrice}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity
          <input
            name="itemQuantity"
            type="number"
            min="1"
            value={formState.itemQuantity}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="filters-grid">
        <label>
          Status
          <select
            name="status"
            value={formState.status}
            onChange={handleChange}
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
          Delivery Time
          <input
            name="deliveryTime"
            value={formState.deliveryTime}
            onChange={handleChange}
            placeholder="30 mins"
          />
        </label>

        <label>
          Rating
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={formState.rating}
            onChange={handleChange}
            placeholder="0-5"
          />
        </label>
      </div>

      <div>
        <button type="submit">Add Order</button>
      </div>

      {formError ? <p className="muted">{formError}</p> : null}
    </form>
  );
};

export default OrderForm;
