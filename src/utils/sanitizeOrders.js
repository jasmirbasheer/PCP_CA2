const ALLOWED_STATUSES = new Set([
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

const toFiniteNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

export const normalizeStatus = (status) => {
  const rawStatus = String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  if (rawStatus === "canceled") {
    return "cancelled";
  }

  if (rawStatus === "out_for_delivery" || rawStatus === "out-for-delivery") {
    return "out_for_delivery";
  }

  if (ALLOWED_STATUSES.has(rawStatus)) {
    return rawStatus;
  }

  return "pending";
};

const sanitizeItems = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const name = String(item?.name ?? "").trim();
      const price = toFiniteNumber(item?.price);
      const quantity = toFiniteNumber(item?.quantity);

      return {
        name,
        price: price ?? 0,
        quantity: quantity === null ? 0 : Math.floor(quantity),
      };
    })
    .filter((item) => item.name && item.price > 0 && item.quantity > 0);
};

export const sanitizeOrder = (rawOrder, index = 0) => {
  if (!rawOrder || typeof rawOrder !== "object") {
    return null;
  }

  const orderId = String(
    rawOrder.orderid ?? rawOrder.orderId ?? rawOrder.id ?? `AUTO-${index + 1}`,
  ).trim();

  if (!orderId) {
    return null;
  }

  const customerName =
    String(rawOrder.customerName ?? "").trim() || "Unknown Customer";
  const restaurant =
    String(rawOrder.restaurant ?? "").trim() || "Unknown Restaurant";

  const items = sanitizeItems(rawOrder.items);

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const rawTotal = toFiniteNumber(rawOrder.totalAmount);
  const totalAmount =
    rawTotal !== null && rawTotal >= 0
      ? rawTotal
      : Number(itemsTotal.toFixed(2));

  if (items.length === 0 && totalAmount <= 0) {
    return null;
  }

  const rawRating = toFiniteNumber(rawOrder.rating);
  const rating =
    rawRating !== null && rawRating >= 0 && rawRating <= 5
      ? Number(rawRating.toFixed(1))
      : null;

  const deliveryTime =
    rawOrder.deliveryTime === null || rawOrder.deliveryTime === undefined
      ? "N/A"
      : String(rawOrder.deliveryTime).trim() || "N/A";

  return {
    orderid: orderId,
    customerName,
    restaurant,
    items,
    totalAmount: Number(totalAmount.toFixed(2)),
    status: normalizeStatus(rawOrder.status),
    deliveryTime,
    rating,
  };
};

export const sanitizeOrders = (orders) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const cleaned = safeOrders
    .map((order, index) => sanitizeOrder(order, index))
    .filter(Boolean);

  const deduplicated = cleaned.reduce(
    (accumulator, order) => {
      if (!accumulator.ids.has(order.orderid)) {
        accumulator.ids.add(order.orderid);
        accumulator.orders.push(order);
      }

      return accumulator;
    },
    {
      ids: new Set(),
      orders: [],
    },
  );

  return deduplicated.orders;
};
