import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Products_Add_Request,
} from './actionTypes';
import {
  requestProducts,
  responseProducts,
  FetchProductsRequest
} from './types';

const ProductsAdd = (body: requestProducts) =>
  axios.post<responseProducts>('product/shopkeeper/Add', body);

function* fetchProductsAddSaga(action: FetchProductsRequest): any {
  try {
    const response = yield call(ProductsAdd, action.payload);
    yield put(
      actions.fetchProductsAddSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchProductsAddFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* AddProductsSaga() {
  yield all([takeLatest(Fetch_Products_Add_Request, fetchProductsAddSaga)]);
}

export default AddProductsSaga;
