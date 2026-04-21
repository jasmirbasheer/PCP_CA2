import OrdersList from "../components/OrdersList";
import { useOrders } from "../hooks/useOrders";

const FilterPage = () => {
  const { orders, filters, setFilters, resetFilters } = useOrders();

  const filteredOrders = orders
    .filter((order) =>
      filters.status === "all" ? true : order.status === filters.status,
    )
    .filter((order) =>
      order.restaurant
        .toLowerCase()
        .includes(filters.search.toLowerCase().trim()),
    )
    .filter((order) => {
      const minimumRating = Number(filters.minRating || 0);
      const currentRating = order.rating ?? 0;
      return currentRating >= minimumRating;
    });

  return (
    <section>
      <div className="page-header">
        <h1>Filter Orders</h1>
      </div>

      <div className="panel">
        <div className="filters-grid">
          <label>
            Status
            <select
              value={filters.status}
              onChange={(event) => setFilters({ status: event.target.value })}
            >
              <option value="all">all</option>
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="preparing">preparing</option>
              <option value="out_for_delivery">out_for_delivery</option>
              <option value="delivered">delivered</option>
              <option value="cancelled">cancelled</option>
            </select>
          </label>

          <label>
            Restaurant Search
            <input
              data-testid="filter-input"
              type="text"
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
              placeholder="Search by restaurant"
            />
          </label>

          <label>
            Min Rating
            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(event) =>
                setFilters({ minRating: event.target.value })
              }
            />
          </label>
        </div>

        <button className="secondary" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <div className="panel">
        <p className="muted">Matched Orders: {filteredOrders.length}</p>
        <OrdersList orders={filteredOrders} />
      </div>
    </section>
  );
};

export default FilterPage;
