import * as actions from './actionTypes';
import * as types from './types';

export const fetchCustomersListRequest = (
  data: types.requestCustomers
): types.FetchCustomersRequest => ({
  type: actions.Fetch_Customers_List_Request,
  payload: data,
});

export const fetchCustomersListSuccess = (
  payload: types.FetchCustomersResponsePayload
): types.FetchCustomersSuccess => ({
  type: actions.Fetch_Customers_List_Success,
  payload,
});

export const fetchCustomersListFailure = (
  payload: types.FetchCustomersResponsePayload
): types.FetchCustomersFailure => ({
  type: actions.Fetch_Customers_List_Failure,
  payload,
});

export const fetchCustomersListClear = (
): types.FetchCustomersClear => ({
  type: actions.Fetch_Customers_List_Clear,
});
