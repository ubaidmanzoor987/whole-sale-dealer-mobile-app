import {
  Fetch_User_Request,
  Fetch_User_Success,
  Fetch_User_Failure,
} from "./actionTypes";
import {
  FetchUserRequest,
  FetchUserSuccess,
  FetchUserSuccessPayload,
  FetchUserFailure,
  FetchUserFailurePayload,
  requestUser,
} from "./types";

export const fetchUserRequest = (data: requestUser): FetchUserRequest => ({
  type: Fetch_User_Request,
  payload: data,
});

export const fetchUserSuccess = (
  payload: FetchUserSuccessPayload
): FetchUserSuccess => ({
  type: Fetch_User_Success,
  payload,
});

export const fetchUserFailure = (
  payload: FetchUserFailurePayload
): FetchUserFailure => ({
  type: Fetch_User_Failure,
  payload,
});
