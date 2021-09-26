import * as actions from './actionTypes';

import { IUser, IUserData, UserActions, UserState } from './types';

const initialState: UserState = {
  pending: false,
  user: {} as any,
  message: '',
  error: null,
};

export default (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case actions.Fetch_User_Create_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_User_Create_Success:
      return {
        ...state,
        pending: false,
        user: {} as IUserData,
        message: action.payload.message,
        error: null,
      };
    case actions.Fetch_User_Create_Failure:
      return {
        ...state,
        pending: false,
        user: {} as IUserData,
        error: action.payload.error,
      };
    case actions.Fetch_User_Login_Request:
      return {
        ...state,
        pending: true,
      };
    case actions.Fetch_User_Login_Success:
      return {
        ...state,
        pending: false,
        user: action.payload.user,
        message: action.payload.message,
        error: null,
      };
    case actions.Fetch_User_Login_Failure:
      return {
        ...state,
        pending: false,
        user: {} as any,
        error: action.payload.error,
      };
    case actions.Fetch_User_Logout_Request:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case actions.Fetch_User_Logout_Success:
      return {
        ...state,
        pending: false,
        user: action.payload.data,
        message: action.payload.message,
        error: null,
      };
    case actions.Fetch_User_Logout_Failure:
      return {
        ...state,
        pending: false,
        message: '',
        error: action.payload.error,
      };
      case actions.Fetch_User_Forget_Request:
        return {
          ...state,
          pending: true,
          user: {} as any,
          error: null,
        };
      case actions.Fetch_User_Forget_Success:
        return {
          ...state,
          pending: false,
          user: action.payload.data,
          message: action.payload.message,
          error: null,
        };
      case actions.Fetch_User_Forget_Failure:
        return {
          ...state,
          pending: false,
          message: '',
          user: {} as any,
          error: action.payload.error,
        };
      
    default:
      return {
        ...state,
      };
  }
};
