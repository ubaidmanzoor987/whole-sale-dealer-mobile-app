import React from 'react';
import {
  getCartProductDataSelector,
} from '@app/store/products/cart/selector';
import { useSelector } from 'react-redux';
import CommonScreen from '../Common';

export function CartScreen() {
  const cart = useSelector(getCartProductDataSelector);
  return (
    <CommonScreen
      title='Cart'
      subtitle='List of all products in cart'
      data={cart}
      isPending={false}
      error={''}
      showFavourite={false}
      isCart={true}
    />
  );
}