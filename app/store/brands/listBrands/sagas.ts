import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Brand_List_Request,
} from './actionTypes';
import {
  requestBrand,
  responseBrand,
  FetchBrandRequest
} from './types';

const BrandList = (body: requestBrand) =>
  axios.post<responseBrand>('brands/list_brands', body);

function* fetchBrandListSaga(action: FetchBrandRequest): any {
  try {
    const response = yield call(BrandList, action.payload);
    yield put(
      actions.fetchBrandListSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchBrandListFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* ListBrandSaga() {
  yield all([takeLatest(Fetch_Brand_List_Request, fetchBrandListSaga)]);
}

export default ListBrandSaga;
