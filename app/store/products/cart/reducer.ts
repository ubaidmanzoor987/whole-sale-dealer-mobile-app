import * as actions from './actionTypes';

import { ProductsActions, ProductsState, IProducts } from './types';

const initialState: ProductsState = {
  pending: false,
  data: [],
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: ProductsActions): ProductsState => {
  switch (action.type) {
    case actions.Fetch_Products_Cart_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_Products_Cart_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response,
      };
    case actions.Fetch_Products_Cart_Failure:
      return {
        ...state,
        pending: false,
      };
    case actions.Fetch_Products_Cart_Clear:
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
