// Orders.jsx
import React, { useEffect, useState } from "react";
import { selectFilter } from "@/selectors/selector";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Boundary } from "@/components/common";
import OrdersTable from "../components/OrdersTable";

const Orders = () => {
  useDocumentTitle("Order List | Admin Sethji");
  useScrollTop();

  const store = useSelector((state) => ({
    //filteredOrders: selectFilter(state.orders.items, state.filter),
    filteredOrders: state.orders.items,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    orders: state.orders,
  }));
  // const filteredOrders=useSelector((store) => store.orders.items);
  console.log({store});
  return (
    // <Boundary>
    //   <OrdersNavbar
    //     productsCount={store.products.items.length}
    //     totalProductsCount={store.products.total}
    //   />
    //   <div className="product-admin-items">
    //     <OrdersList {...store}>
    //       <AppliedFilters filter={store.filter} />
    //       <OrdersTable filteredProducts={store.filteredProducts} />
    //     </OrdersList>
    //   </div>
    // </Boundary>
    <Boundary>
        <div className="order-admin-items">
          <OrdersTable filteredOrders={store.filteredOrders} />
        </div>
    </Boundary>
  );
};

export default withRouter(Orders);
