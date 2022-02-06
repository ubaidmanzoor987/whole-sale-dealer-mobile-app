import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Products_Order_Request,
} from './actionTypes';
import {
  FetchProductsRequest,
  requestProducts,
} from './types';

const placeOrder = (body: requestProducts) =>
  axios.post('order/insert', body);

function* fetchProductsOrderSaga(action: FetchProductsRequest): any {
  try {
    console.log("action", action);
    const response = yield call(placeOrder, action.payload);
    console.log("action", action);
    console.log("res", response);
    yield put(
      actions.fetchProductsOrderSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchProductsOrderFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* OrderProductsSaga() {
  yield all([takeLatest(Fetch_Products_Order_Request, fetchProductsOrderSaga)]);
}

export default OrderProductsSaga;
