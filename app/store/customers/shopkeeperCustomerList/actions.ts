import * as actions from './actionTypes';
import * as types from './types';

export const fetchListShopkeeperCustomerRequest = (
  data: types.requestListShopkeeperCustomer
): types.FetchListShopkeeperCustomerRequest => ({
  type: actions.Fetch_Shopkeeper_Customer_List_Request,
  payload: data,
});

export const fetchListShopkeeperCustomerSuccess = (
  payload: types.FetchListShopkeeperCustomerResponsePayload
): types.FetchListShopkeeperCustomerSuccess => ({
  type: actions.Fetch_Shopkeeper_Customer_List_Success,
  payload,
});

export const fetchListShopkeeperCustomerFailure = (
  payload: types.FetchListShopkeeperCustomerResponsePayload
): types.FetchListShopkeeperCustomerFailure => ({
  type: actions.Fetch_Shopkeeper_Customer_List_Failure,
  payload,
});

export const fetchListShopkeeperCustomerClear = (
): types.FetchListShopkeeperCustomerClear => ({
  type: actions.Fetch_Shopkeeper_Customer_List_Clear,
});
