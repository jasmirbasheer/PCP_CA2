import { useEffect, useReducer } from "react";
import { getDataset, getToken } from "../api/api";
import OrdersReducer, { initialFilterState } from "../reducer/OrdersReducer";
import { OrdersContext } from "./ordersContextObject";
import {
  normalizeStatus,
  sanitizeOrder,
  sanitizeOrders,
} from "../utils/sanitizeOrders";

const initialState = {
  orders: [],
  loading: true,
  error: null,
  filters: { ...initialFilterState },
};

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const tokenRes = await getToken("E0123003", "686996", "SETA");
        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);

        const rawOrders = Array.isArray(dataset)
          ? dataset
          : Array.isArray(dataset?.orders)
            ? dataset.orders
            : [];

        dispatch({
          type: "SET_ORDERS",
          payload: sanitizeOrders(rawOrders),
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error?.message ?? "Unable to load dataset",
        });
        console.error("Error fetching orders:", error?.message);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = (rawOrder) => {
    const cleanOrder = sanitizeOrder(rawOrder, state.orders.length);

    if (!cleanOrder) {
      return false;
    }

    const alreadyExists = state.orders.some(
      (order) => order.orderid === cleanOrder.orderid,
    );

    if (alreadyExists) {
      return false;
    }

    dispatch({ type: "ADD_ORDER", payload: cleanOrder });
    return true;
  };

  const updateOrderStatus = (orderid, status) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderid, status: normalizeStatus(status) },
    });
  };

  const updateOrderRating = (orderid, rating) => {
    if (rating === "") {
      dispatch({
        type: "UPDATE_ORDER_RATING",
        payload: { orderid, rating: null },
      });
      return;
    }

    const parsed = Number(rating);

    if (!Number.isFinite(parsed)) {
      return;
    }

    const bounded = Math.max(0, Math.min(5, parsed));

    dispatch({
      type: "UPDATE_ORDER_RATING",
      payload: { orderid, rating: Number(bounded.toFixed(1)) },
    });
  };

  const deleteOrder = (orderid) => {
    dispatch({ type: "DELETE_ORDER", payload: orderid });
  };

  const setFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <OrdersContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        addOrder,
        updateOrderStatus,
        updateOrderRating,
        deleteOrder,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
