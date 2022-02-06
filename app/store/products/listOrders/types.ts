import { IProducts } from '../listProducts/types';
import * as actionTypes from './actionTypes';

export interface responseData {
  brand_name: string;
  created_at: string;
  customer_name: string;
  customer_shop_address: string;
  customer_shop_name: string;
  total_price: Number;
  image1: string;
  image1b64: string;
  image2: string;
  image2b64: string;
  image3: string;
  image3b64: string;
  order_id: string;
  product_id: Number;
  product_name: string;
  quantites: Number,
  shopkeeper_address: string,
  shopkeeper_owner_name: string,
  shopkeeper_shop_name: string,
  status: string,
  updated_at: string,
  user_id: number
};


export interface requestListOrder {
  user_id: Number | null;
}

export interface responseListOrders {
  success: boolean;
  message: string;
  data: responseData[] | [];
  error: string | null | any;
}

export interface listOrderState {
  pending: boolean;
  data: responseData[] | IProducts[];
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchListOrderResponsePayload {
  response: responseListOrders;
}

export interface FetchListOrderRequest {
  type: typeof actionTypes.Fetch_List_Order_Request;
  payload: requestListOrder;
}

export type FetchListOrderSuccess = {
  type: typeof actionTypes.Fetch_List_Order_Success;
  payload: FetchListOrderResponsePayload;
};

export type FetchListOrderFailure = {
  type: typeof actionTypes.Fetch_List_Order_Failure;
  payload: FetchListOrderResponsePayload;
};

export type FetchListOrderClear = {
  type: typeof actionTypes.Fetch_List_Order_Clear;
};

export type listOrderActions =
  | FetchListOrderRequest
  | FetchListOrderSuccess
  | FetchListOrderFailure
  | FetchListOrderClear;
