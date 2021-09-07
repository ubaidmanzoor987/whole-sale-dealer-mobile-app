import * as actions from './actionTypes';

export interface IUserData {
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
export interface IUser {
  data?: IUserData;
  message: string;
}

// Sign Up Types

export interface requestUserCreate {
  user_name: string;
  shop_name: string;
  email: string;
  password: string;
  user_type: string;
}

export interface FetchUserCreateSuccessPayload {
  message: string;
  data: any | null;
}

export interface FetchUserCreateFailurePayload {
  error: string;
}

export interface FetchUserCreateRequest {
  type: typeof actions.Fetch_User_Create_Request;
  payload: requestUserCreate;
}

export type FetchUserCreateSuccess = {
  type: typeof actions.Fetch_User_Create_Success;
  payload: FetchUserCreateSuccessPayload;
};

export type FetchUserCreateFailure = {
  type: typeof actions.Fetch_User_Create_Failure;
  payload: FetchUserCreateFailurePayload;
};

// Login Types
export interface requestUserLogin {
  user_name: string;
  password: string;
  user_type: string;
}

export interface UserState {
  pending: boolean;
  user: IUserData;
  message: string | null;
  error: string | null;
}

export interface FetchUserLoginSuccessPayload {
  user: IUserData;
  message: string;
}

export interface FetchUserLoginFailurePayload {
  error: string;
}

export interface FetchUserLoginRequest {
  type: typeof actions.Fetch_User_Login_Request;
  payload: requestUserLogin;
}

export type FetchUserLoginSuccess = {
  type: typeof actions.Fetch_User_Login_Success;
  payload: FetchUserLoginSuccessPayload;
};

export type FetchUserLoginFailure = {
  type: typeof actions.Fetch_User_Login_Failure;
  payload: FetchUserLoginFailurePayload;
};

// Logout Types  Start From Here

export interface requestUserLogout {
  token: string;
  user_name: string;
}

export interface FetchUserLogoutSuccessPayload {
  message: string;
  data: any | null;
}

export interface FetchUserLogoutFailurePayload {
  error: string;
}

export interface FetchUserLogoutRequest {
  type: typeof actions.Fetch_User_Logout_Request;
  payload: requestUserLogout;
}

export type FetchUserLogoutSuccess = {
  type: typeof actions.Fetch_User_Logout_Success;
  payload: FetchUserLogoutSuccessPayload;
};

export type FetchUserLogoutFailure = {
  type: typeof actions.Fetch_User_Logout_Failure;
  payload: FetchUserLogoutFailurePayload;
};

export type UserActions =
  | FetchUserCreateRequest
  | FetchUserCreateSuccess
  | FetchUserCreateFailure
  | FetchUserLoginRequest
  | FetchUserLoginSuccess
  | FetchUserLoginFailure
  | FetchUserLogoutRequest
  | FetchUserLogoutSuccess
  | FetchUserLogoutFailure;
