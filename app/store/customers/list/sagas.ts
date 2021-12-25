import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import {
  Fetch_Customer_List_Request,
} from './actionTypes';
import {
  requestListCustomer,
  responseUserLogin,
  FetchListCustomerRequest
} from './types';

const listCustomers = (body: requestListCustomer) =>
  axios.post<responseUserLogin>( 'user/customers/list', body);

function* fetchListCustomersSaga(action: FetchListCustomerRequest): any {
  try {
    const response = yield call(listCustomers, action.payload);

    yield put(
      actions.fetchListCustomerSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchListCustomerFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* listCustomerSaga() {
  yield all([takeLatest(Fetch_Customer_List_Request, fetchListCustomersSaga)]);
}

export default listCustomerSaga;
