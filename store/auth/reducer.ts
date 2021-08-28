import {
  Fetch_User_Request,
  Fetch_User_Success,
  Fetch_User_Failure,
} from "./actionTypes";

import { IUser, UserActions, UserState } from "./types";

const initialState: UserState = {
  pending: false,
  user: {},
  error: null,
};

export default (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case Fetch_User_Request:
      return {
        ...state,
        pending: true,
      };
    case Fetch_User_Success:
      return {
        ...state,
        pending: false,
        user: action.payload.user,
        error: null,
      };
    case Fetch_User_Failure:
      return {
        ...state,
        pending: false,
        user: {},
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
