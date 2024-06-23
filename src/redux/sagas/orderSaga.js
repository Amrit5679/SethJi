/* eslint-disable indent */
import {
    GET_ORDERS,
    REMOVE_ORDER,
    SEARCH_ORDER
  } from '@/constants/constants';
  import { ADMIN_ORDERS } from '@/constants/routes';
  import { displayActionMessage } from '@/helpers/utils';
  import {
    all, call, put, select
  } from 'redux-saga/effects';
  import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
  import { history } from '@/routers/AppRouter';
  import firebase from '@/services/firebase';
  import {
    getOrdersSuccess,
    removeOrderSuccess,
    searchOrderSuccess
  } from '../actions/orderActions';
  
  function* initRequest() {
    yield put(setLoading(true));
    yield put(setRequestStatus(null));
  }
  
  function* handleError(e) {
    yield put(setLoading(false));
    yield put(setRequestStatus(e?.message || 'Failed to fetch orders'));
    console.log('ERROR: ', e);
  }
  
  function* handleAction(location, message, status) {
    if (location) yield call(history.push, location);
    yield call(displayActionMessage, message, status);
  }
  
  function* orderSaga({ type, payload }) {
    switch (type) {
      case GET_ORDERS:
        try {
          yield initRequest();
          const state = yield select();
          const result = yield call(firebase.getOrders, payload);
         
          console.log("getOrders Called")
         
          if (result.orders.length === 0) {
            yield handleError('No orders found.');
          } else {
            yield put(getOrdersSuccess({
              orders: result.orders,
              lastKey: result.lastKey ? result.lastKey : state.orders.lastRefKey,
              total: result.total ? result.total : state.orders.total
            }));
            yield put(setRequestStatus(''));
          }
          yield put(setLoading(false));
        } catch (e) {
          console.log(e);
          yield handleError(e);
        }
        break;

      case REMOVE_ORDER: {
        try {
          yield initRequest();
          yield call(firebase.removeOrder, payload);
          yield put(removeOrderSuccess(payload));
          yield put(setLoading(false));
          yield handleAction(ADMIN_ORDERS, 'Order successfully removed', 'success');
        } catch (e) {
          yield handleError(e);
          yield handleAction(undefined, `Order failed to remove: ${e.message}`, 'error');
        }
        break;
      }
      case SEARCH_ORDER: {
        try {
          yield initRequest();
          // clear search data
          yield put(clearSearchState());
  
          const state = yield select();
          const result = yield call(firebase.searchOrders, payload.searchKey);
  
          if (result.orders.length === 0) {
            yield handleError({ message: 'No order found.' });
            yield put(clearSearchState());
          } else {
            yield put(searchOrderSuccess({
              orders: result.orders,
              lastKey: result.lastKey ? result.lastKey : state.orders.searchedOrders.lastRefKey,
              total: result.total ? result.total : state.orders.searchedOrders.total
            }));
            yield put(setRequestStatus(''));
          }
          yield put(setLoading(false));
        } catch (e) {
          yield handleError(e);
        }
        break;
      }
      default: {
        throw new Error(`Unexpected action type ${type}`);
      }
    }
  }
  
  export default orderSaga;
  