import * as actionTypes from './actionTypes';

export interface IBrand {
  brand_name: string;
  own_brand: boolean;
  user_id: number;
}

export interface requestBrand {
  user_id: number | null;
}

export interface responseBrand {
  success: boolean;
  message: string;
  data: IBrand[] | [];
  error: string | null | any;
}

export interface BrandState {
  pending: boolean;
  data: IBrand[] | [];
  error: string | null;
  success: boolean;
  message: string;
}

export interface FetchBrandResponsePayload {
  response: responseBrand;
}

export interface FetchBrandRequest {
  type: typeof actionTypes.Fetch_Brand_List_Request;
  payload: requestBrand;
}

export type FetchBrandSuccess = {
  type: typeof actionTypes.Fetch_Brand_List_Success;
  payload: FetchBrandResponsePayload;
};

export type FetchBrandFailure = {
  type: typeof actionTypes.Fetch_Brand_List_Failure;
  payload: FetchBrandResponsePayload;
};

export type FetchBrandClear = {
  type: typeof actionTypes.Fetch_Brand_List_Clear;
};

export type BrandActions =
  | FetchBrandRequest
  | FetchBrandSuccess
  | FetchBrandFailure
  | FetchBrandClear;
