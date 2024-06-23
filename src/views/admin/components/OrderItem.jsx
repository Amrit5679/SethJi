import { ImageLoader } from "@/components/common";
import {
  displayActionMessage,
  displayDate,
  displayMoney,
} from "@/helpers/utils";
import PropType from "prop-types";
import React, { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { removeOrder } from "@/redux/actions/orderActions";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderRef = useRef(null);
  const totalOrderAmount = order?.products?.reduce(
    (total, product) => total + product.productPrice,
    0
  );
  //   const onClickEdit = () => {
  //     history.push(`${EDIT_PRODUCT}/${order.id}`);
  //   };

  const onDeleteOrder = () => {
    orderRef.current.classList.toggle("item-active");
  };

  const onConfirmDelete = () => {
    dispatch(removeOrder(order.id));
    displayActionMessage("Item successfully deleted");
    orderRef.current.classList.remove("item-active");
  };

  const onCancelDelete = () => {
    orderRef.current.classList.remove("item-active");
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`item item-orders ${!order.id && "item-loading"}`}
        ref={orderRef}
      >
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {order?.products[0]?.productImage ? (
              <ImageLoader
                alt={order.userName}
                className="item-img"
                src={order?.products[0]?.productImage}
              />
            ) : (
              <Skeleton width={50} height={30} />
            )}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">
              {order.userName || <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col">
            <span>{order.userMobile || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{order.address || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>
              {totalOrderAmount ? (
                displayMoney(totalOrderAmount)
              ) : (
                <Skeleton width={30} />
              )}
            </span>
          </div>
          <div className="grid-col">
            <span>
              {order.orderDate ? (
                displayDate(order.orderDate)
              ) : (
                <Skeleton width={30} />
              )}
            </span>
          </div>
        </div>
        {order.id && (
          <div className="item-action">
            {/* <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button"
            >
              Edit
            </button> */}
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteOrder}
              type="button"
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button"
              >
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-danger"
                onClick={onConfirmDelete}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

OrderItem.propTypes = {
  order: PropType.shape({
    id: PropType.string,
    address: PropType.string.isRequired,
    orderNotes: PropType.string,
    products: PropType.arrayOf(
      PropType.shape({
        productId: PropType.string.isRequired,
        productImage: PropType.string.isRequired,
        productName: PropType.string.isRequired,
        productPrice: PropType.number.isRequired,
      })
    ).isRequired,
    timestamps: PropType.shape({
      orderDate: PropType.instanceOf(Date).isRequired,
      paymentDate: PropType.instanceOf(Date),
    }).isRequired,
    userEmail: PropType.string.isRequired,
    userMobile: PropType.string.isRequired,
    userName: PropType.string.isRequired,
  }).isRequired,
};
export default withRouter(OrderItem);
