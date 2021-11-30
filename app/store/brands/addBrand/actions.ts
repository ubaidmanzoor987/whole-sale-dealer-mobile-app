import * as actions from './actionTypes';
import * as types from './types';

export const fetchBrandCreateRequest = (
  data: types.requestBrand
): types.FetchBrandRequest => ({
  type: actions.Fetch_Brand_Create_Request,
  payload: data,
});

export const fetchBrandCreateSuccess = (
  payload: types.FetchBrandResponsePayload
): types.FetchBrandSuccess => ({
  type: actions.Fetch_Brand_Create_Success,
  payload,
});

export const fetchBrandCreateFailure = (
  payload: types.FetchBrandResponsePayload
): types.FetchBrandFailure => ({
  type: actions.Fetch_Brand_Create_Failure,
  payload,
});

export const fetchBrandCreateClear = (
): types.FetchBrandClear => ({
  type: actions.Fetch_Brand_Create_Clear,
});
