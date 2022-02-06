import * as actions from './actionTypes';
import * as types from './types';

export const fetchPlaceOrderRequest = (
  data: types.requestPlaceOrder
): types.FetchPlaceOrderRequest => ({
  type: actions.Fetch_Place_Order_Request,
  payload: data,
});

export const fetchPlaceOrderSuccess = (
  payload: types.FetchPlaceOrderResponsePayload
): types.FetchPlaceOrderSuccess => ({
  type: actions.Fetch_Place_Order_Success,
  payload,
});

export const fetchPlaceOrderFailure = (
  payload: types.FetchPlaceOrderResponsePayload
): types.FetchPlaceOrderFailure => ({
  type: actions.Fetch_Place_Order_Failure,
  payload,
});

export const fetchPlaceOrderClear = (
): types.FetchPlaceOrderClear => ({
  type: actions.Fetch_Place_Order_Clear,
});
