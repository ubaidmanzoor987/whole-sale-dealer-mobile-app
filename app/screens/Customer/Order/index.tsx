import React from 'react';
import { useSelector } from 'react-redux';
import CommonScreen from '../Common';
import { getOrderProductDataSelector } from '@app/store/products/order/selector';

export function OrdersScreen() {
  const orders = useSelector(getOrderProductDataSelector);
  return (
    <CommonScreen
      title='Orders'
      subtitle='List of all your orders'
      data={orders}
      isPending={false}
      error={''}
      showFavourite={false}
      isFavorite={false}
      isCart={false}
      isOrder={true}
    />
  );
}