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
import { getDataSelector as getBrandSelector } from '@app/store/brands/addBrand/selector';
import AddBrandBottomSheet from './addBrandBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { fetchBrandCreateClear } from '@app/store/brands/addBrand/actions';

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
  const brands = useSelector(listBrandSelector);
  const isPending = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [openModel, setOpenModel] = useState<boolean>(false);
  const addBrandsBottomSheetRef = useRef() as any;
  const [row, setRow] = useState<any>({});
  const addBrandSelector = useSelector(getBrandSelector);

  const user = useSelector(getUserSelector);
  useEffect(() => {
    if (brands.length === 0)
      dispatch(fetchBrandListRequest({ user_id: user && user.id }));
  }, [user]);

  const cols = [
    {
      name: 'Brand Name',
      col_name: 'brand_name',
      type: 'string',
    },
    {
      name: 'Own Brand',
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
    addBrandsBottomSheetRef.current.open();
  };

  const handleClose = (row: any) => {
    addBrandsBottomSheetRef.current.close();
  };

  const handleDelete = () => {
    Alert.alert('Warning', 'Are you sure You want to delete!', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => console.log('OK Pressed') },
    ]);
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
            {itemData.item.own_brand === true ? 'Yes' : 'No'}
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
            <TouchableOpacity style={{ marginRight: '3%' }}>
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                color={'#5460E0'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
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
      {/* <FilterWidget
        columns={props.use_dashboard_cols ? columns : cols}
        stocks={stocksData}
        setStocks={setStocksProps}
      /> */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleWelcomeText}>Brands</Text>
        <Text style={styles.titleSignText}>List of all brands</Text>
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
          Add Brands
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5%',
        }}
      >
        <FlatList
          nestedScrollEnabled
          data={brands}
          style={{ width: '98%' }}
          keyExtractor={(item, index) => index + ''}
          ListHeaderComponent={tableHeader}
          stickyHeaderIndices={[0]}
          ListFooterComponent={
            isPending ? (
              <ActivityIndicator size="large" color="#27428B" />
            ) : (
              <></>
            )
          }
          ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
          renderItem={({ item, index }) => (
            <RenderedItemsData item={item} index={index} />
          )}
        />
      </View>

      <AddBrandBottomSheet
        ref={addBrandsBottomSheetRef}
        navigation={navigation}
        closeSheet={handleClose}
      />
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
    height: '20%',
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
