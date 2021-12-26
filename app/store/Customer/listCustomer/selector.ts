import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.customersList.pending;

const getData = (state: AppState) => state.customersList.data;

const getMessage = (state: AppState) => state.customersList.message;

const getError = (state: AppState) => state.customersList.error;

const getSuccess = (state: AppState) => state.customersList.success;

export const getCustomerListSelector = createSelector(getData, (data) => data);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
