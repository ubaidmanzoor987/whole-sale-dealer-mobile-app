import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_List_Order_Request,
} from './actionTypes';
import {
  requestListOrder,
  responseListOrders,
  FetchListOrderRequest
} from './types';

const listOrders = (body: requestListOrder) =>
  axios.post<responseListOrders>('order/list', body);

function* fetchListOrdersSaga(action: FetchListOrderRequest): any {
  try {
    const response = yield call(listOrders, action.payload);
    yield put(
      actions.fetchListOrderSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchListOrderFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* listOrderSaga() {
  yield all([takeLatest(Fetch_List_Order_Request, fetchListOrdersSaga)]);
}

export default listOrderSaga;
