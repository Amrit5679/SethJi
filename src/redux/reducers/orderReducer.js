import {
  SEARCH_ORDER_SUCCESS,
  GET_ORDERS_SUCCESS,
  REMOVE_ORDER_SUCCESS,
} from "@/constants/constants";

const initState = {
  lastRefKey: null,
  total: 0,
  items: [],
};

  export default (state = {
    lastRefKey: null,
    total: 0,
    items: [],
    searchedOrders: initState
  }, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.orders],
      };
    case SEARCH_ORDER_SUCCESS:
      return {
        ...state,
        searchedOrders: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedOrders.items, ...action.payload.orders],
        },
      };
    case REMOVE_ORDER_SUCCESS:
      return {
        ...state,
        items: state.items.filter((order) => order.id !== action.payload)
      };
    default:
      return state;
  }
};
