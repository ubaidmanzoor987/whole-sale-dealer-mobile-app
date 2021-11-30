import * as actions from './actionTypes';

import { BrandActions, BrandState, IBrand } from './types';

const initialState: BrandState = {
  pending: false,
  data: {} as IBrand,
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: BrandActions): BrandState => {
  switch (action.type) {
    case actions.Fetch_Brand_Create_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_Brand_Create_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_Brand_Create_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || {} as IBrand,
        error: action.payload.response.error,
      };
    case actions.Fetch_Brand_Create_Clear:
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
