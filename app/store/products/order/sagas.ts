import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Products_Order_Request,
} from './actionTypes';
import {
  FetchProductsRequest
} from './types';


function* fetchProductsOrderSaga(action: FetchProductsRequest): any {
  try {
    yield put(
      actions.fetchProductsOrderSuccess({
        response: action.payload.data
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
