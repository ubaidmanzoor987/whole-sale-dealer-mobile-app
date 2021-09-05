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
}

export interface requestUser {
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

export interface FetchUserSuccessPayload {
  user: IUserData;
  message: string;
}

export interface FetchUserFailurePayload {
  error: string;
}

export interface FetchUserRequest {
  type: typeof actions.Fetch_User_Request;
  payload: requestUser;
}

export type FetchUserSuccess = {
  type: typeof actions.Fetch_User_Success;
  payload: FetchUserSuccessPayload;
};

export type FetchUserFailure = {
  type: typeof actions.Fetch_User_Failure;
  payload: FetchUserFailurePayload;
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
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure
  | FetchUserLogoutRequest
  | FetchUserLogoutSuccess
  | FetchUserLogoutFailure;
