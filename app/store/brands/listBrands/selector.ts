import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.brands.pending;

const getData = (state: AppState) => state.brands.data;

const getMessage = (state: AppState) => state.brands.message;

const getError = (state: AppState) => state.brands.error;

const getSuccess = (state: AppState) => state.brands.success;

export const getDataSelector = createSelector(getData, (brand) => brand);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
