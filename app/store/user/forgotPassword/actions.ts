import * as actions from './actionTypes';
import * as types from './types';

export const fetchUserForgetRequest = (
  data: types.requestUserForget
): types.FetchUserForgetRequest => ({
  type: actions.Fetch_User_Forget_Request,
  payload: data,
});

export const fetchUserForgetSuccess = (
  payload: types.FetchUserResponsePayload
): types.FetchUserForgetSuccess => ({
  type: actions.Fetch_User_Forget_Success,
  payload,
});

export const fetchUserForgetFailure = (
  payload: types.FetchUserResponsePayload
): types.FetchUserForgetFailure => ({
  type: actions.Fetch_User_Forget_Failure,
  payload,
});

export const fetchUserForgetClear = (
): types.FetchUserForgetClear => ({
  type: actions.Fetch_User_Forget_Clear,
});
