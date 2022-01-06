import { createSelector } from 'reselect';

import { AppState } from '@app/store/rootReducer';

const getPending = (state: AppState) => state.shopkeeperCustomersList.pending;

const getData = (state: AppState) => state.shopkeeperCustomersList.data;

const getMessage = (state: AppState) => state.shopkeeperCustomersList.message;

const getError = (state: AppState) => state.shopkeeperCustomersList.error;

const getSuccess = (state: AppState) => state.shopkeeperCustomersList.success;

export const getShopkeeperCustomersListDataSelector = createSelector(getData, (user) => user);

export const getShopkeeperCustomersListPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getShopkeeperCustomersListErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(
  getMessage,
  (message) => message
);
