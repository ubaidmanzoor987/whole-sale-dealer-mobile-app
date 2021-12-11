import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Products_List_Request,
} from './actionTypes';
import {
  requestProducts,
  responseProducts,
  FetchProductsRequest
} from './types';

const ProductsList = (body: requestProducts) =>
  axios.post<responseProducts>('product/shopkeeper/list', body);

function* fetchProductsListSaga(action: FetchProductsRequest): any {
  try {
    const response = yield call(ProductsList, action.payload);
    yield put(
      actions.fetchProductsListSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchProductsListFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* ListProductsSaga() {
  yield all([takeLatest(Fetch_Products_List_Request, fetchProductsListSaga)]);
}

export default ListProductsSaga;
