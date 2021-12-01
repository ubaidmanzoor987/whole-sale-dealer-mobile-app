import * as actions from './actionTypes';
import * as types from './types';

export const fetchBrandListRequest = (
  data: types.requestBrand
): types.FetchBrandRequest => ({
  type: actions.Fetch_Brand_List_Request,
  payload: data,
});

export const fetchBrandListSuccess = (
  payload: types.FetchBrandResponsePayload
): types.FetchBrandSuccess => ({
  type: actions.Fetch_Brand_List_Success,
  payload,
});

export const fetchBrandListFailure = (
  payload: types.FetchBrandResponsePayload
): types.FetchBrandFailure => ({
  type: actions.Fetch_Brand_List_Failure,
  payload,
});

export const fetchBrandListClear = (
): types.FetchBrandClear => ({
  type: actions.Fetch_Brand_List_Clear,
});
