import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import _ from 'lodash';
import Constants from 'expo-constants';
import { IProducts } from '@app/store/products/listProducts/types';
import { ENV_VAR } from '@app/utils/environments';
import { EmptyContainer } from '@app/utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProductDataSelector } from '@app/store/products/cart/selector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchProductsOrderRequest } from '@app/store/products/order/actions';

interface renderProps {
  product: IProducts;
  index?: any;
  type?: any;
}

export function CheckoutScreen() {
  const dispatch = useDispatch();
  const [orders, setOrders] = React.useState<Array<IProducts>>([]);

  const cart = useSelector(getCartProductDataSelector);
  const navigation = useNavigation();

  const RenderedItemsData = ({ product }: renderProps) => {
    const [quantity, setQuantity] = useState<string>('1');

    const incrDecreaseQuantity = (name: string) => {
      switch (name) {
        case 'plus':
          setQuantity((Number(quantity) + 1).toString());
          break;
        case 'minus':
          if (Number(quantity) > 1) {
            setQuantity((Number(quantity) - 1).toString());
          }
          break;
        default:
          break;
      }
    };
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: '4%',
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 10,
          padding: '5%',
        }}
      >
        <View
          style={{
            width: '25%',
            display: 'flex',
            marginLeft: '2%',
          }}
        >
          {product.image1 ? (
            <Image
              source={{ uri: ENV_VAR.baseUrl + product.image1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 25,
              }}
            />
          ) : (
            <MaterialCommunityIcons name="face-profile" size={70} />
          )}
        </View>
        <View
          style={{
            width: '73%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text style={{ fontSize: 20, marginTop: '5%' }}>
            {product.product_name}
          </Text>
          <Text>Product By: {product.user_name_shopkeeper}</Text>
          <View
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <View style={{ width: '100%', marginVertical: '2%' }}>
              <Text>Quantities</Text>
            </View>
            <View style={{ width: '100%', marginLeft: '-5%' }}>
              <TextInput
                value={quantity}
                placeholder="Quantity"
                style={styles.inputField}
                keyboardType="decimal-pad"
                maxLength={4}
              />
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity onPress={() => incrDecreaseQuantity('plus')}>
                <MaterialCommunityIcons
                  name="plus-box"
                  color="#5460E0"
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => incrDecreaseQuantity('minus')}>
                <MaterialCommunityIcons
                  name="minus-box"
                  color="#5460E0"
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity onPress={() =>{}}
                style={{display:'flex', flexDirection:'row'}}
              >
                <Text>
                  Remove Product From Cart
                </Text>
                <MaterialCommunityIcons
                  name="delete-empty"
                  color="red"
                  size={25}
                  style={{marginTop: '-2%', marginLeft: '2%'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onPressOrder = () => {
    dispatch(fetchProductsOrderRequest({data: cart}))
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity onPress={goBack}>
            <MaterialCommunityIcons
              name="arrow-left"
              style={{
                ...styles.titleWelcomeText,
                paddingTop: '7%',
                paddingLeft: '2%',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleWelcomeText}>Checkout</Text>
        </View>
        <Text style={styles.titleSignText}>Order Your product now!</Text>
      </View>
      <FlatList
        data={cart}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index + ''}
        ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
        renderItem={({ item, index }) => (
          <RenderedItemsData product={item} index={index} />
        )}
        ListEmptyComponent={<EmptyContainer />}
      />
      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <TouchableOpacity
          onPress={onPressOrder}
          style={{
            borderRadius: 40,
            width: '45%',
            backgroundColor: '#5460E0',
            height: 70,
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Place Your Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F8',
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
    backgroundColor: 'white',
    marginTop: '2%',
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
  inputField: {
    width: '93%',
    marginLeft: '5%',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: '2%',
    padding: '2%',
  },
});
