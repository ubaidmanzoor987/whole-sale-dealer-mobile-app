import * as actions from './actionTypes';
import * as types from './types';

export const fetchListCustomerRequest = (
  data: types.requestListCustomer
): types.FetchListCustomerRequest => ({
  type: actions.Fetch_Customer_List_Request,
  payload: data,
});

export const fetchListCustomerSuccess = (
  payload: types.FetchListCustomerResponsePayload
): types.FetchListCustomerSuccess => ({
  type: actions.Fetch_Customer_List_Success,
  payload,
});

export const fetchListCustomerFailure = (
  payload: types.FetchListCustomerResponsePayload
): types.FetchListCustomerFailure => ({
  type: actions.Fetch_Customer_List_Failure,
  payload,
});

export const fetchListCustomerClear = (
): types.FetchListCustomerClear => ({
  type: actions.Fetch_Customer_List_Clear,
});
