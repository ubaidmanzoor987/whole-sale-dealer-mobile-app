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
  getCustomerListSelector,
  getPendingSelector,
  getErrorSelector,
} from '@app/store/Customer/listCustomer/selector';
import { fetchCustomersListRequest } from '@app/store/Customer/listCustomer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import { getDataSelector as getBrandSelector } from '@app/store/brands/addBrand/selector';
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

function TableWidget(props: Props) {
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerList = useSelector(getCustomerListSelector);
  const isPending = useSelector(getPendingSelector);
  const [selectedColumn, setSelectedColumn] = useState('');
  const viewCustomerBottomSheet = useRef() as any;
  const [row, setRow] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const user = useSelector(getUserSelector);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (customerList.length === 0)
      console.log(customerList);
      
      dispatch(fetchCustomersListRequest({ user_id: user && user.id }));
  }, [user]);

  useEffect(()=>{
    console.log(customerList);
  }, [customerList])

  const cols = [
    {
      name: 'Customer Name',
      col_name: 'user_name',
      type: 'string',
    },
    {
      name: 'Phone Number',
      col_name: 'owner_phone_no',
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
    const sortedData = _.orderBy(customerList, [col], [newDirection]);
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
    viewCustomerBottomSheet.current.open();
  };

  const handleClose = (row: any) => {
    viewCustomerBottomSheet.current.close();
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
            dispatch(fetchCustomersListRequest({ user_id: user && user.id }));
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
    viewCustomerBottomSheet.current.open();
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
          <Text style={styles.columnRowTxt}>{itemData.item.user_name}</Text>
          <Text style={styles.columnRowTxt}>
            {itemData.item.owner_phone_no ? itemData.item.owner_phone_no : 'N/A'}
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
                name="eye"
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>Customer</Text>
        <Text style={styles.titleSignText}>List of all customer</Text>
      </View>
      <TouchableOpacity
        style={styles.addBrandTouchable}
        onPress={openAddBrandSheet}
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
          Add Customer
        </Text>
      </TouchableOpacity>
      <FlatList
        data={customerList}
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
        ref={viewCustomerBottomSheet}
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

export default React.memo(TableWidget);

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