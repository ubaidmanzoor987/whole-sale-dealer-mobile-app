import * as actions from './actionTypes';
import * as types from './types';

export const fetchProductsCartRequest = (
  data: types.requestProducts
): types.FetchProductsRequest => ({
  type: actions.Fetch_Products_Cart_Request,
  payload: data,
});

export const fetchProductsCartSuccess = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsSuccess => ({
  type: actions.Fetch_Products_Cart_Success,
  payload,
});

export const fetchProductsCartFailure = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsFailure => ({
  type: actions.Fetch_Products_Cart_Failure,
  payload,
});

export const fetchProductsCartClear = (
): types.FetchProductsClear => ({
  type: actions.Fetch_Products_Cart_Clear,
});
