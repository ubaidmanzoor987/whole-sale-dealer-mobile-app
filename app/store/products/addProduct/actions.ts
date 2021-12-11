import * as actions from './actionTypes';
import * as types from './types';

export const fetchProductsAddRequest = (
  data: types.requestProducts
): types.FetchProductsRequest => ({
  type: actions.Fetch_Products_Add_Request,
  payload: data,
});

export const fetchProductsAddSuccess = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsSuccess => ({
  type: actions.Fetch_Products_Add_Success,
  payload,
});

export const fetchProductsAddFailure = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsFailure => ({
  type: actions.Fetch_Products_Add_Failure,
  payload,
});

export const fetchProductsAddClear = (
): types.FetchProductsClear => ({
  type: actions.Fetch_Products_Add_Clear,
});
