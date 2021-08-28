import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.user.pending;

const getUser = (state: AppState) => state.user.user;

const getError = (state: AppState) => state.user.error;

export const getUserSelector = createSelector(getUser, (user) => user);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
