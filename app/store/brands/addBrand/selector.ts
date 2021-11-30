import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.addBrand.pending;

const getData = (state: AppState) => state.addBrand.data;

const getMessage = (state: AppState) => state.addBrand.message;

const getError = (state: AppState) => state.addBrand.error;

const getSuccess = (state: AppState) => state.addBrand.success;

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
