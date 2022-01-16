import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import Constants from 'expo-constants';
import {
  getPendingSelector,
  getProductSelector,
  getErrorSelector,
} from '@app/store/products/listProducts/selector';
import { IProducts } from '@app/store/products/listProducts/types';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import { useNavigation } from '@react-navigation/native';
import { fetchProductsListRequest } from '@app/store/products/listProducts/actions';
import { ENV_VAR } from '@app/utils/environments';
import { EmptyContainer } from '@app/utils/commonFunctions';

interface Props {
  rows?: any;
  isPending?: boolean;
  error?: any;
}

interface renderProps {
  product?: IProducts;
  index?: any;
  type?: any;
}

function ProductScreen() {
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Products Store Data
  const productsPending = useSelector(getPendingSelector);
  const productsData = useSelector(getProductSelector);
  const productsError = useSelector(getErrorSelector);

  const [selectedColumn, setSelectedColumn] = useState('');
  const productsBottomSheetRef = useRef() as any;
  const [row, setRow] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const user = useSelector(getUserSelector);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    dispatch(fetchProductsListRequest({ user_id: user && user.id }));
  }, [user]);

  const cols = [
    {
      name: 'Image',
      col_name: 'product_image',
      type: 'string',
    },
    {
      name: 'Name',
      col_name: 'product_name',
      type: 'string',
    },
    {
      name: 'Qty',
      col_name: 'qty',
      type: 'number',
    },
    {
      name: 'Price',
      col_name: 'price',
      type: 'number',
    },
    {
      name: 'Action',
      col_name: 'action',
      type: 'string',
    },
  ];

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {cols.map((column, index) => {
        {
          return (
            <TouchableOpacity key={index} style={styles.columnHeader}>
              <Text style={styles.columnHeaderTxt}>
                {column.name + ' '}
                {selectedColumn === column.col_name && (
                  <MaterialCommunityIcons
                    name={
                      direction === 'desc'
                        ? 'arrow-down-drop-circle'
                        : 'arrow-up-drop-circle'
                    }
                  />
                )}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );

  const navigateToAddProducts = () => {
    navigation.navigate('AddEditProductScreen', { isEdit: true, row: null });
  };

  const openViewEditBrandSheet = (row: any) => {
    // productsBottomSheetRef.current.open();
    navigation.navigate('AddEditProductScreen', { isEdit: true, row });
  };

  const handleClose = (row: any) => {
    productsBottomSheetRef.current.close();
  };

  const RenderedItemsData = ({ product }: renderProps) => {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            ...styles.tableRow,
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              width: '15%',
            }}
          >
            {product?.image1 !== '' ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={{
                  uri: ENV_VAR.baseUrl + product?.image1,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={require('@app/assets/images/sampleImage.png')}
              />
            )}
          </View>
          <Text style={styles.columnRowTxt}>{product?.product_name}</Text>
          <Text style={styles.columnRowTxt}> {product?.quantities}</Text>
          <Text style={styles.columnRowTxt}> {product?.price}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              padding: 5,
            }}
          >
            <TouchableOpacity onPress={() => openViewEditBrandSheet(product)}>
              <Text>View | Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const refetchProducts = () => {
    if (user && user.id) {
      dispatch(fetchProductsListRequest({ user_id: user.id }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>Products</Text>
        <Text style={styles.titleSignText}>List of all products</Text>
      </View>
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
            onPress={navigateToAddProducts}
          >
            <MaterialCommunityIcons
              name="plus-box"
              color="black"
              size={20}
              style={{ marginRight: '2%' }}
            />
            <Text
              style={{
                color: 'black',
              }}
            >
              Add Product
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={refetchProducts}
          style={{
            alignItems: 'flex-end',
            width: '25%',
            justifyContent: 'flex-end',
          }}
        >
          <MaterialCommunityIcons name="reload" size={24} color={'black'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={productsData}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          productsPending ? (
            <ActivityIndicator size="large" color="#27428B" />
          ) : (
            <></>
          )
        }
        ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
        ListEmptyComponent={EmptyContainer}
        renderItem={({ item, index }) => (
          <RenderedItemsData product={item} index={index} />
        )}
      />

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: isError ? 'red' : '#5460E0',
          marginBottom: '6%',
        }}
      >
        <Text style={{ color: 'white' }}>{message}</Text>
      </Snackbar>
    </View>
  );
}

export default ProductScreen;

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
});
