import * as actions from './actionTypes';

import { UserActions, userLoginState } from './types';

const initialState: userLoginState = {
  pending: false,
  data: {} as any,
  error: "",
  success: false,
  message: ""
};

export default (state = initialState, action: UserActions): userLoginState => {
  switch (action.type) {
    case actions.Fetch_User_Login_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_User_Login_Success:
      return {
        ...state,
        pending: false,
        data: action.payload.response.data,
        message: action.payload.response.message,
        error: action.payload.response.error,
      };
    case actions.Fetch_User_Login_Failure:
      return {
        ...state,
        pending: false,
        success: action.payload.response.success || false,
        message: action.payload.response.message || 'failed',
        data: action.payload.response.data || {} as any,
        error: action.payload.response.error,
      };
    case actions.User_Auto_Login:
      // console.log("res reducer", action);
      return {
        ...state,
        data: action.payload as any,
      };
    case actions.Fetch_User_Login_Clear:
      return {
        pending: false,
        data: {} as any,
        message: "",
        error: "",
        success: false,
      };
    default:
      return {
        ...state,
      };
  }
};
