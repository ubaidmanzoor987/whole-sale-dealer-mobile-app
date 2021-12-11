import * as actions from './actionTypes';
import * as types from './types';

export const fetchProductsListRequest = (
  data: types.requestProducts
): types.FetchProductsRequest => ({
  type: actions.Fetch_Products_List_Request,
  payload: data,
});

export const fetchProductsListSuccess = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsSuccess => ({
  type: actions.Fetch_Products_List_Success,
  payload,
});

export const fetchProductsListFailure = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsFailure => ({
  type: actions.Fetch_Products_List_Failure,
  payload,
});

export const fetchProductsListClear = (
): types.FetchProductsClear => ({
  type: actions.Fetch_Products_List_Clear,
});
