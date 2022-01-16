import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Products_Cart_Request,
} from './actionTypes';
import {
  FetchProductsRequest
} from './types';


function* fetchProductsCartSaga(action: FetchProductsRequest): any {
  try {
    yield put(
      actions.fetchProductsCartSuccess({
        response: action.payload.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchProductsCartFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* CartProductsSaga() {
  yield all([takeLatest(Fetch_Products_Cart_Request, fetchProductsCartSaga)]);
}

export default CartProductsSaga;
