import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.addProduct.pending;

const getData = (state: AppState) => state.addProduct.data;

const getMessage = (state: AppState) => state.addProduct.message;

const getError = (state: AppState) => state.addProduct.error;

const getSuccess = (state: AppState) => state.addProduct.success;

export const getaddProductelector = createSelector(getData, (data) => data);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
