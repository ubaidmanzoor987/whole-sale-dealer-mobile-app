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
}

export interface requestListShopkeeperCustomer {
  user_id: number | null;
}

export interface responseUserLogin {
  success: boolean;
  message: string;
  data: IUser[] | null;
  error: string | null | any;
}

export interface ListShopkeeperCustomerState {
  pending: boolean;
  data: IUser[] | null;
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchListShopkeeperCustomerResponsePayload {
  response: responseUserLogin;
}

export interface FetchListShopkeeperCustomerRequest {
  type: typeof actionTypes.Fetch_Shopkeeper_Customer_List_Request;
  payload: requestListShopkeeperCustomer;
}

export type FetchListShopkeeperCustomerSuccess = {
  type: typeof actionTypes.Fetch_Shopkeeper_Customer_List_Success;
  payload: FetchListShopkeeperCustomerResponsePayload;
};

export type FetchListShopkeeperCustomerFailure = {
  type: typeof actionTypes.Fetch_Shopkeeper_Customer_List_Failure;
  payload: FetchListShopkeeperCustomerResponsePayload;
};

export type FetchListShopkeeperCustomerClear = {
  type: typeof actionTypes.Fetch_Shopkeeper_Customer_List_Clear;
};

export type UserActions =
  | FetchListShopkeeperCustomerRequest
  | FetchListShopkeeperCustomerSuccess
  | FetchListShopkeeperCustomerFailure
  | FetchListShopkeeperCustomerClear
