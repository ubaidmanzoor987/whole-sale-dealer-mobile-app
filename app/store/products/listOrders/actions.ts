import * as actions from './actionTypes';
import * as types from './types';

export const fetchListOrderRequest = (
  data: types.requestListOrder
): types.FetchListOrderRequest => ({
  type: actions.Fetch_List_Order_Request,
  payload: data,
});

export const fetchListOrderSuccess = (
  payload: types.FetchListOrderResponsePayload
): types.FetchListOrderSuccess => ({
  type: actions.Fetch_List_Order_Success,
  payload,
});

export const fetchListOrderFailure = (
  payload: types.FetchListOrderResponsePayload
): types.FetchListOrderFailure => ({
  type: actions.Fetch_List_Order_Failure,
  payload,
});

export const fetchListOrderClear = (
): types.FetchListOrderClear => ({
  type: actions.Fetch_List_Order_Clear,
});
