import * as actions from './actionTypes';
import * as types from './types';

export const fetchProductsFavoriteRequest = (
  data: types.requestProducts
): types.FetchProductsRequest => ({
  type: actions.Fetch_Products_Favorite_Request,
  payload: data,
});

export const fetchProductsFavoriteSuccess = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsSuccess => ({
  type: actions.Fetch_Products_Favorite_Success,
  payload,
});

export const fetchProductsFavoriteFailure = (
  payload: types.FetchProductsResponsePayload
): types.FetchProductsFailure => ({
  type: actions.Fetch_Products_Favorite_Failure,
  payload,
});

export const fetchProductsFavoriteClear = (
): types.FetchProductsClear => ({
  type: actions.Fetch_Products_Favorite_Clear,
});
