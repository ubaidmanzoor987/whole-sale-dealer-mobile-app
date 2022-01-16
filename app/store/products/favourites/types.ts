import * as actionTypes from './actionTypes';

export interface IProducts {
  product_id: number;
  product_name: string;
  image1?: string;
  image2?: string;
  image3?: string;
  price: number;
  quantities: number;
  product_des?: string;
  brand_id: number;
  user_id: number;
  brand_name?: string;
  user_name_shopkeeper?: string;
  user_shop_name?: string,
  user_owner_name?: string,
  user_address? : string,
  user_image? : string,
  image1b64?: string,
  image2b64?: string,
  image3b64?: string,
}

export interface requestProducts {
  data: IProducts[];
}

export interface ProductsState {
  pending: boolean;
  data: IProducts[] | [];
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchProductsResponsePayload {
  response: IProducts[];
}

export interface FetchProductsRequest {
  type: typeof actionTypes.Fetch_Products_Favorite_Request;
  payload: requestProducts;
}

export type FetchProductsSuccess = {
  type: typeof actionTypes.Fetch_Products_Favorite_Success;
  payload: FetchProductsResponsePayload;
};

export type FetchProductsFailure = {
  type: typeof actionTypes.Fetch_Products_Favorite_Failure;
  payload: FetchProductsResponsePayload;
};

export type FetchProductsClear = {
  type: typeof actionTypes.Fetch_Products_Favorite_Clear;
};

export type ProductsActions =
  | FetchProductsRequest
  | FetchProductsSuccess
  | FetchProductsFailure
  | FetchProductsClear;
