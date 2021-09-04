import { combineReducers } from "redux";

import authReducer from "./auth/reducer";

const rootReducer = combineReducers({
  user: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;