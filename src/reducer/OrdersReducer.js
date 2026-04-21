export const initialFilterState = {
  status: "all",
  search: "",
  minRating: "0",
};

const OrdersReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_ORDERS":
      return {
        ...state,
        loading: false,
        error: null,
        orders: Array.isArray(action.payload) ? action.payload : [],
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderid === action.payload.orderid
            ? { ...order, status: action.payload.status }
            : order,
        ),
      };

    case "UPDATE_ORDER_RATING":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderid === action.payload.orderid
            ? { ...order, rating: action.payload.rating }
            : order,
        ),
      };

    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.orderid !== action.payload,
        ),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: { ...initialFilterState },
      };

    default:
      return state;
  }
};

export default OrdersReducer;
