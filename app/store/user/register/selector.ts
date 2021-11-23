import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.register.pending;

const getData = (state: AppState) => state.register.data;

const getMessage = (state: AppState) => state.register.message;

const getError = (state: AppState) => state.register.error;

const getSuccess = (state: AppState) => state.register.success;

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
