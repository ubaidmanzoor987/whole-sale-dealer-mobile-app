import { ImageResult } from 'expo-image-manipulator';
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
  image: ImageResult | string;
  email: string;
  id: number;
  token: string;
  imageb64: string;
  expo_push_token: string;
}

export interface requestListCustomer {
  user_id: number | null;
}

export interface responseUserLogin {
  success: boolean;
  message: string;
  data: IUser[] | null;
  error: string | null | any;
}

export interface listCustomerState {
  pending: boolean;
  data: IUser[] | null;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchListCustomerResponsePayload {
  response: responseUserLogin;
}

export interface FetchListCustomerRequest {
  type: typeof actionTypes.Fetch_Customer_List_Request;
  payload: requestListCustomer;
}

export type FetchListCustomerSuccess = {
  type: typeof actionTypes.Fetch_Customer_List_Success;
  payload: FetchListCustomerResponsePayload;
};

export type FetchListCustomerFailure = {
  type: typeof actionTypes.Fetch_Customer_List_Failure;
  payload: FetchListCustomerResponsePayload;
};

export type FetchListCustomerClear = {
  type: typeof actionTypes.Fetch_Customer_List_Clear;
};

export type UserActions =
  | FetchListCustomerRequest
  | FetchListCustomerSuccess
  | FetchListCustomerFailure
  | FetchListCustomerClear
