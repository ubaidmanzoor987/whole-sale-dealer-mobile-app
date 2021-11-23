import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.login.pending;

const getData = (state: AppState) => state.login.data;

const getMessage = (state: AppState) => state.login.message;

const getError = (state: AppState) => state.login.error;

const getSuccess = (state: AppState) => state.login.success;

export const getDataSelector = createSelector(getData, (user) => user);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
