import PropType from 'prop-types';
import React from 'react';
import { OrderItem } from '.';

const OrdersTable = ({ filteredOrders }) => (
    <div>
      {filteredOrders.length > 0 && (
        <div className="grid grid-product grid-count-6">
          <div className="grid-col" />
          <div className="grid-col">
            <h5>Name</h5>
          </div>
          <div className="grid-col">
            <h5>Brand</h5>
          </div>
          <div className="grid-col">
            <h5>Price</h5>
          </div>
          <div className="grid-col">
            <h5>Date Added</h5>
          </div>
          <div className="grid-col">
            <h5>Qty</h5>
          </div>
        </div>
      )}
      {filteredOrders.length === 0 ? new Array(10).fill({}).map((order, index) => (
        <OrderItem
          // eslint-disable-next-line react/no-array-index-key
          key={`order-skeleton ${index}`}
          order={order}
        />
      )) : filteredOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
  
  OrdersTable.propTypes = {
    filteredOrders: PropType.array.isRequired
  };
  
  export default OrdersTable;