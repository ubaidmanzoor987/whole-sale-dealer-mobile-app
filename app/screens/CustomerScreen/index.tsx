import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import Constants from 'expo-constants';
import {
  getDataSelector as listBrandSelector,
  getPendingSelector,
  getErrorSelector,
} from '@app/store/brands/listBrands/selector';
import { fetchBrandListRequest } from '@app/store/brands/listBrands/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import AddBrandBottomSheet from './viewCustomerBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { deleteBrand } from '@app/utils/apis';

interface Props {
  rows?: any;
  isPending?: boolean;
  error?: any;
}

interface renderProps {
  item?: any;
  index?: any;
  type?: any;
}

function Customers() {
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const brands = useSelector(listBrandSelector);
  const isPending = useSelector(getPendingSelector);
  const [selectedColumn, setSelectedColumn] = useState('');
  const addBrandsBottomSheetRef = useRef() as any;
  const [row, setRow] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const user = useSelector(getUserSelector);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (brands.length === 0 && user && user.id)
    {
      dispatch(fetchBrandListRequest({ user_id: user.id }));
    }
  }, [dispatch, user]);

  const cols = [
    {
      name: 'Name',
      col_name: 'brand_name',
      type: 'string',
    },
    {
      name: 'Phone Number',
      col_name: 'own_brand',
      type: 'boolean',
    },
    {
      name: 'Action',
      col_name: 'action',
      type: 'boolean',
    },
  ];

  const sortColumn = (col) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const sortedData = _.orderBy(brands, [col], [newDirection]);
    setDirection(newDirection);
    // setStocks(sortedData);
    setSelectedColumn(col);
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {cols.map((column, index) => {
        {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => sortColumn(column.col_name)}
            >
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

  const openAddBrandSheet = () => {
    setRow({});
    setIsEdit(false);
    addBrandsBottomSheetRef.current.open();
  };

  const openAddCustomerScreen = () => {
    navigation.navigate('AddCustomerScreen', {});
  }

  const handleClose = (row: any) => {
    addBrandsBottomSheetRef.current.close();
  };

  const handleDelete = (itemData: renderProps) => {
    Alert.alert('Warning', 'Are you sure You want to delete!', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const req = {
            brand_id: itemData.item.id,
            user_id: user?.id,
          };
          const res = await deleteBrand(req);
          if (res.message) {
            dispatch(fetchBrandListRequest({ user_id: user && user.id }));
            setVisible(true);
            setMessage(res.message);
          } else if (res.error) {
            setVisible(true);
            setMessage(res.message);
            setIsError(true);
          }
        },
      },
    ]);
  };

  const handleEditClick = (itemData: renderProps) => {
    setRow(itemData.item);
    setIsEdit(true);
    addBrandsBottomSheetRef.current.open();
  };

  const RenderedItemsData = (itemData: renderProps) => {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            ...styles.tableRow,
            backgroundColor: itemData.index % 2 == 1 ? '#CFD5E5' : 'white',
          }}
        >
          <Text style={styles.columnRowTxt}>{itemData.item.brand_name}</Text>
          <Text style={styles.columnRowTxt}>
            {itemData.item.own_brand === 'true' ? 'Yes' : 'No'}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30%',
            }}
          >
            <TouchableOpacity
              style={{ marginRight: '3%' }}
              onPress={() => {
                handleEditClick(itemData);
              }}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                color={'#5460E0'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(itemData)}>
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color={'red'}
                style={{ opacity: 0.8 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  console.log('brands', brands, user);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>Customers</Text>
        <Text style={styles.titleSignText}>List of Your Customers</Text>
      </View>
      <TouchableOpacity
        style={styles.addBrandTouchable}
        onPress={openAddCustomerScreen}
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
          Add Customers
        </Text>
      </TouchableOpacity>
      <FlatList
        data={brands}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          isPending ? <ActivityIndicator size="large" color="#27428B" /> : <></>
        }
        ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
        renderItem={({ item, index }) => (
          <RenderedItemsData item={item} index={index} />
        )}
      />

      <AddBrandBottomSheet
        ref={addBrandsBottomSheetRef}
        navigation={navigation}
        closeSheet={handleClose}
        row={row}
        isEdit={isEdit}
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

export default React.memo(Customers);

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
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  columnHeader: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    width: '33%',
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
  },
  activityIndator: {
    marginTop: '-100%',
  },
  addBrandTouchable: {
    marginTop: '5%',
    marginLeft: '1%',
    width: '40%',
    height: '5%',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
