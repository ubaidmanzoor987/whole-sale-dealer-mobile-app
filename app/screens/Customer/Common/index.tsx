import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import Constants from 'expo-constants';
import { IProducts } from '@app/store/products/listProducts/types';
import { ENV_VAR } from '@app/utils/environments';
import DetailBottomSheet from './BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsFavoriteRequest } from '@app/store/products/favourites/actions';
import { EmptyContainer } from '@app/utils/commonFunctions';
import { getFavouiteProductDataSelector } from '@app/store/products/favourites/selector';
import { useNavigation } from '@react-navigation/native';
import { responseData } from '@app/store/products/listOrders/types';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';

interface Props {
  title: string;
  subtitle: string;
  data?: any;
  isPending?: boolean;
  error?: any;
  refetchProducts?: () => void;
  showFavourite?: boolean;
  isFavorite?: boolean;
  isCart?: boolean;
  isProduct?: boolean;
  isOrder?: boolean;
}

interface renderProps {
  product: IProducts & responseData;
  index?: any;
  type?: any;
}

function CommonScreen({
  data,
  isPending,
  error,
  refetchProducts,
  title,
  subtitle,
  showFavourite,
  isCart,
  isFavorite,
  isProduct,
  isOrder,
}: Props) {
  const dispatch = useDispatch();
  const favouritesProducts = useSelector(getFavouiteProductDataSelector);
  const productsDetailBottomSheetRef = useRef() as any;
  const [row, setRow] = useState<IProducts>({} as any);
  const [favourites, setFavourites] = React.useState<Array<IProducts>>([]);
  
  const user = useSelector(getUserSelector)
  
  const openProductDetailSheet = (row: IProducts) => {
    // if (isOrder === true && user && user.user_type === "customer"){
    //   return;
    // }
    productsDetailBottomSheetRef.current.open();
    setRow(row);
  };

  const navigation = useNavigation();

  const handleClose = () => {
    productsDetailBottomSheetRef.current.close();
  };

  const getIndex = (array: IProducts[], value: number) => {
    const ind = array.findIndex((obj) => obj.product_id === value);
    return ind;
  };

  const onPressFavroites = (product: IProducts) => {
    const ind = getIndex(favourites, product.product_id);
    if (isFavorite === true) {
      const newArray = [...favourites];
      newArray.splice(ind, 1);
      setFavourites(newArray);
      dispatch(fetchProductsFavoriteRequest({ data: newArray }));
    } else {
      if (ind === -1) {
        const newArray = [...favourites];
        newArray.push(product);
        dispatch(fetchProductsFavoriteRequest({ data: newArray }));
        setFavourites((oldData) => [...oldData, product]);
      } else {
        const newArray = [...favourites];
        newArray.splice(ind, 1);
        dispatch(fetchProductsFavoriteRequest({ data: newArray }));
        setFavourites(newArray);
      }
    }
  };

  // useEffect(() => {
  //   dispatch(fetchProductsFavoriteRequest({ data: favourites }));
  // }, [favourites]);

  const getFavoritesIcon = (product: IProducts) => {
    if (isFavorite === true) {
      return 'heart';
    }
    const ind = getIndex(favourites, product.product_id);
    if (ind === -1) {
      return 'heart-outline';
    }
    return 'heart';
  };

  const getRight = (product: IProducts) => {
    if (showFavourite)
      return (
        <MaterialCommunityIcons
          onPress={() => {
            onPressFavroites(product);
          }}
          name={getFavoritesIcon(product)}
          size={24}
          style={{ marginRight: '5%', color: 'red' }}
        />
      );
  };

  const RenderedItemsData = ({ product }: renderProps) => {
    return (
      <TouchableWithoutFeedback onPress={() => openProductDetailSheet(product)}>
        <Card style={{ marginVertical: 5 }}>
          {product?.image1 !== '' ? (
            <Card.Cover source={{ uri: ENV_VAR.baseUrl + product?.image1 }} />
          ) : (
            <Card.Cover
              source={require('@app/assets/images/sampleImage.png')}
            />
          )}
          <Card.Title
            title={product?.product_name}
            subtitle={
              isOrder === true ? (
                <></>
              ) : (
                <>
                  <Text>In Stock</Text>
                  <Text
                    style={{ color: product?.quantities > 0 ? 'grey' : 'red' }}
                  >
                    {product?.quantities > 0 ? ' Available' : ' Out Of Stock '}
                  </Text>
                </>
              )
            }
            right={() => getRight(product)}
            titleStyle={{ color: '#5460E0' }}
            subtitleStyle={{}}
          />
          <Card.Content style={{ marginTop: '-1%' }}>
            <Text style={{ color: '#76A8B0' }}>
              Brand {product?.brand_name}
            </Text>
            {/* <Text style={{ color: 'lightgreen' }}>
              A Product By {product.user_shop_name}
            </Text> */}
            {isOrder && <Text style={{ color: 'blue' }}>Status: {product.status}</Text>}
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  const handleRefetchProducts = () => {
    if (refetchProducts) {
      refetchProducts();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>{title}</Text>
        <Text style={styles.titleSignText}>{subtitle}</Text>
      </View>
      {isProduct === true && (
        <View
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            marginTop: '4%',
            marginLeft: '1%',
          }}
        >
          <View style={{ width: '70%' }}>
            <TouchableOpacity
              style={styles.addBrandTouchable}
              onPress={handleRefetchProducts}
            >
              <Text
                style={{
                  color: 'black',
                }}
              >
                Refresh
              </Text>
              <MaterialCommunityIcons
                name="reload"
                color="black"
                size={20}
                style={{ marginLeft: '2%' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <FlatList
        data={data}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index + ''}
        ListFooterComponent={
          isPending ? <ActivityIndicator size="large" color="#27428B" /> : <></>
        }
        ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
        renderItem={({ item, index }) => (
          <RenderedItemsData product={item} index={index} />
        )}
        ListEmptyComponent={<EmptyContainer />}
      />
      {isCart === true && data && data?.length > 0 && (
        <>
          <View style={styles.addToCartButtonView}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => navigation.navigate('CheckoutScreen')}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontStyle: 'italic',
                  marginRight: 10,
                  textTransform: 'none',
                  paddingRight: 10,
                }}
              >
                Proceed to checkout{' '}
              </Text>
              <MaterialCommunityIcons name="cart" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        </>
      )}

      <DetailBottomSheet
        ref={productsDetailBottomSheetRef}
        closeSheet={handleClose}
        row={row}
        isCart={isCart}
        isOrder={isOrder}
      />
    </View>
  );
}

export default CommonScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F8',
    height: '100%',
    marginTop: Constants.statusBarHeight,
  },
  titleContainer: {
    backgroundColor: 'white',
    height: '15%',
    width: '99%',
    alignSelf: 'center',
    borderBottomRightRadius: 80,
  },
  titleWelcomeText: {
    paddingLeft: '5%',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: '5%',
    color: '#5460E0',
  },
  titleSignText: {
    paddingLeft: '5%',
    fontStyle: 'italic',
    color: 'black',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#5460E0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    display: 'flex',
  },
  flatListContainer: {
    width: '98%',
    display: 'flex',
    alignSelf: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  columnHeader: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    width: '20%',
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndator: {
    marginTop: '-100%',
  },
  addBrandTouchable: {
    marginLeft: '1%',
    width: '60%',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%',
    backgroundColor: 'white',
  },
  inputFieldsMainView: {
    backgroundColor: 'transparent',
  },
  addToCartButtonView: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },
  addToCartButton: {
    width: '50%',
    padding: '4%',
    borderRadius: 20,
    backgroundColor: '#8D32AB',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
