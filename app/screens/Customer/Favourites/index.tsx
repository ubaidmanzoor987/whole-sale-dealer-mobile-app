import React from 'react';
import {
  getFavouiteProductDataSelector,
} from '@app/store/products/favourites/selector';
import { useSelector } from 'react-redux';
import CommonScreen from '../Common';

export function FavouritesScreen() {
  const favouites = useSelector(getFavouiteProductDataSelector);
  return (
    <CommonScreen
      title='Favourites'
      subtitle='List of all favouites products'
      data={favouites}
      isPending={false}
      error={''}
      showFavourite={false}
      isFavorite={true}
      isCart={false}
      isOrder={false}
    />
  );
}