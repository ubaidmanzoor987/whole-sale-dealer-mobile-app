import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.customersList.pending;

const getData = (state: AppState) => state.customersList.data;

const getMessage = (state: AppState) => state.customersList.message;

const getError = (state: AppState) => state.customersList.error;

const getSuccess = (state: AppState) => state.customersList.success;

export const getCustomersListDataSelector = createSelector(getData, (user) => user);

export const getCustomersListPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getCustomersListErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
