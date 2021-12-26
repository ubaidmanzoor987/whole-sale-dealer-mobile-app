import * as actions from './actionTypes';

import { CustomersActions, CustomersState, ICustomers } from './types';

const initialState: CustomersState = {
  pending: false,
  data: [],
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: CustomersActions): CustomersState => {
  switch (action.type) {
    case actions.Fetch_Customers_List_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_Customers_List_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_Customers_List_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || [],
        error: action.payload.response.error,
      };
    case actions.Fetch_Customers_List_Clear:
      return initialState;
    default:
      return {
        ...state,
      };
  }
};
