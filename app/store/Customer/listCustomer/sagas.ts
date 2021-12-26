import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import {
  Fetch_Customers_List_Request,
} from './actionTypes';
import {
  requestCustomers,
  responseCustomers,
  FetchCustomersRequest
} from './types';

const CustomersList = (body: requestCustomers) =>
  axios.post<responseCustomers>('user/listCustomer_Shopkeeper', body);

function* fetchCustomersListSaga(action: FetchCustomersRequest): any {
  try {
    const response = yield call(CustomersList, action.payload);
    yield put(
      actions.fetchCustomersListSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchCustomersListFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* ListCustomersSaga() {
  yield all([takeLatest(Fetch_Customers_List_Request, fetchCustomersListSaga)]);
}

export default ListCustomersSaga;
