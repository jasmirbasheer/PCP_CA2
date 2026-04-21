import { useOrders } from "../hooks/useOrders";

const StatsPage = () => {
  const { orders } = useOrders();

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled",
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0,
  );

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const averageRating = (() => {
    const ratedOrders = orders.filter(
      (order) => typeof order.rating === "number",
    );
    if (ratedOrders.length === 0) {
      return 0;
    }

    const ratingSum = ratedOrders.reduce((sum, order) => sum + order.rating, 0);
    return ratingSum / ratedOrders.length;
  })();

  const revenueByRestaurant = orders.reduce((accumulator, order) => {
    const key = order.restaurant;
    accumulator[key] = (accumulator[key] || 0) + order.totalAmount;
    return accumulator;
  }, {});

  const topRestaurants = Object.entries(revenueByRestaurant)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section>
      <div className="page-header">
        <h1>Order Statistics</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="muted">Total Orders</p>
          <h2 data-testid="total-orders">{totalOrders}</h2>
        </div>

        <div className="stat-card">
          <p className="muted">Delivered Orders</p>
          <h2 data-testid="delivered-orders">{deliveredOrders}</h2>
        </div>

        <div className="stat-card">
          <p className="muted">Cancelled Orders</p>
          <h2 data-testid="cancelled-orders">{cancelledOrders}</h2>
        </div>
      </div>

      <div className="panel">
        <p>Total Revenue: Rs. {totalRevenue.toFixed(2)}</p>
        <p>Average Order Value: Rs. {averageOrderValue.toFixed(2)}</p>
        <p>Average Rating: {averageRating.toFixed(2)}</p>
      </div>

      <div className="panel">
        <h3>Top Restaurants by Revenue</h3>
        <ul>
          {topRestaurants.map(([restaurant, revenue]) => (
            <li key={restaurant}>
              {restaurant}: Rs. {revenue.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StatsPage;
