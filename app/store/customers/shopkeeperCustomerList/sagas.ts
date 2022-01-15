import axios from '@app/hooks/useAxios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import {
  Fetch_Shopkeeper_Customer_List_Request,
} from './actionTypes';
import {
  requestListShopkeeperCustomer,
  responseUserLogin,
  FetchListShopkeeperCustomerRequest
} from './types';

const ListShopkeeperCustomers = (body: requestListShopkeeperCustomer) =>
  axios.post<responseUserLogin>( 'user/shopkeeper/customers/list', body);

function* fetchListShopkeeperCustomersSaga(action: FetchListShopkeeperCustomerRequest): any {
  try {
    const response = yield call(ListShopkeeperCustomers, action.payload);
    yield put(
      actions.fetchListShopkeeperCustomerSuccess({
        response: response.data
      })
    );
  } catch (e: any) {
    yield put(
      actions.fetchListShopkeeperCustomerFailure({
        response: e.response ? e.response.data : { error: e.message },
      })
    );
  }
}

function* ListShopkeeperCustomerSaga() {
  yield all([takeLatest(Fetch_Shopkeeper_Customer_List_Request, fetchListShopkeeperCustomersSaga)]);
}

export default ListShopkeeperCustomerSaga;
