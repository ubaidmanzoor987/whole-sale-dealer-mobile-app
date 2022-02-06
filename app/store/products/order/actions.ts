import * as actions from './actionTypes';
import * as types from './types';

export const fetchProductsOrderRequest = (
  data: types.requestProducts
): types.FetchProductsRequest => ({
  type: actions.Fetch_Products_Order_Request,
  payload: data,
});

export const fetchProductsOrderSuccess = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsSuccess => ({
  type: actions.Fetch_Products_Order_Success,
  payload,
});

export const fetchProductsOrderFailure = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsFailure => ({
  type: actions.Fetch_Products_Order_Failure,
  payload,
});


export const fetchProductsOrderClear = (
): types.FetchProductsClear => ({
  type: actions.Fetch_Products_Order_Clear,
});
