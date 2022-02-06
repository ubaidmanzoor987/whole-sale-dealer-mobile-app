import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Place_Order_Request,
} from './actionTypes';
import {
  requestPlaceOrder,
  responsePlaceOrder,
  FetchPlaceOrderRequest
} from './types';

const placeOrder = (body: requestPlaceOrder) =>
  axios.post<responsePlaceOrder>('order/insert', body);

function* fetchPlaceOrdersSaga(action: FetchPlaceOrderRequest): any {
  try {
    const response = yield call(placeOrder, action.payload);
    yield put(
      actions.fetchPlaceOrderSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchPlaceOrderFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* orderPlaceSaga() {
  yield all([takeLatest(Fetch_Place_Order_Request, fetchPlaceOrdersSaga)]);
}

export default orderPlaceSaga;
