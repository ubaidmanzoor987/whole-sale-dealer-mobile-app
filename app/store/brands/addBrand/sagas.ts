import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Brand_Create_Request,
} from './actionTypes';
import {
  requestBrand,
  responseBrand,
  FetchBrandRequest
} from './types';

const BrandCreate = (body: requestBrand) =>
  axios.post<responseBrand>('brands/shopkeeper/insert_brand', body);

function* fetchBrandCreateSaga(action: FetchBrandRequest): any {
  try {
    const response = yield call(BrandCreate, action.payload);
    yield put(
      actions.fetchBrandCreateSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchBrandCreateFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* createBrandSaga() {
  yield all([takeLatest(Fetch_Brand_Create_Request, fetchBrandCreateSaga)]);
}

export default createBrandSaga;
