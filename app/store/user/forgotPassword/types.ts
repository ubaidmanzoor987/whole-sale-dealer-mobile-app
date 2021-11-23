import * as actionTypes from './actionTypes';

export interface IUser {
  user_name: string;
  shop_name: string;
  owner_name: string;
  owner_phone_no: string;
  shop_phone_no1: string;
  shop_phone_no2: string;
  loc_long: string;
  loc_lat: string;
  address: string;
  image: string;
  email: string;
  shopkeeper_id: number;
  token: string;
}

export interface requestUserForget {
  email: string;
}

export interface responseUserForget {
  success: boolean;
  message: string;
  data: IUser | null;
  error: string | null | any;
}

export interface userForgetState {
  pending: boolean;
  data: IUser | null;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchUserResponsePayload {
  response: responseUserForget;
}

export interface FetchUserForgetRequest {
  type: typeof actionTypes.Fetch_User_Forget_Request;
  payload: requestUserForget;
}

export type FetchUserForgetSuccess = {
  type: typeof actionTypes.Fetch_User_Forget_Success;
  payload: FetchUserResponsePayload;
};

export type FetchUserForgetFailure = {
  type: typeof actionTypes.Fetch_User_Forget_Failure;
  payload: FetchUserResponsePayload;
};

export type FetchUserForgetClear = {
  type: typeof actionTypes.Fetch_User_Forget_Clear;
};

export type UserActions =
  | FetchUserForgetRequest
  | FetchUserForgetSuccess
  | FetchUserForgetFailure
  | FetchUserForgetClear;
