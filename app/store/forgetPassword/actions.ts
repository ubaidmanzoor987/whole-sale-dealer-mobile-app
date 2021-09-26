import * as actions from './actionTypes';
import * as types from './types';

// Forget Actions
export const fetchUserForgetRequest = (
  data: types.requestUserForget
): types.FetchUserForgetRequest => ({
  type: actions.Fetch_User_Forget_Request,
  payload: data,
});

export const fetchUserForgetSuccess = (
  payload: types.FetchUserForgetSuccessPayload
): types.FetchUserForgetSuccess => ({
  type: actions.Fetch_User_Forget_Success,
  payload,
});

export const fetchUserForgetFailure = (
  payload: types.FetchUserForgetFailurePayload
): types.FetchUserForgetFailure => ({
  type: actions.Fetch_User_Forget_Failure,
  payload,
});

