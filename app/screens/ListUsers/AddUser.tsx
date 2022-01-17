import React, { useState, useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Constants from 'expo-constants';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TextInput as TextInputNative,
  Image,
  Alert,
} from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';
import { fetchListCustomerRequest } from '@app/store/customers/list/actions';
import {
  getCustomersListDataSelector,
  getCustomersListPendingSelector,
  getCustomersListErrorSelector,
} from '@app/store/customers/list/selector';
import { ENV_VAR } from '@app/utils/environments';
import { addCustomer } from '@app/utils/apis';
import { IUser } from '@app/store/user/login/types';
import { fetchListShopkeeperCustomerRequest } from '@app/store/customers/shopkeeperCustomerList/actions';
import { EmptyContainer } from '@app/utils/commonFunctions';

export default function AddUserScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const customersList = useSelector(getCustomersListDataSelector);
  const customersPending = useSelector(getCustomersListPendingSelector);
  const customersError = useSelector(getCustomersListErrorSelector);
  const [error, setError] = useState<string>('');

  const [search, setSearch] = useState<string>('');
  const [customers, setCustomers] = useState<any>([]);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchListCustomerRequest({ user_id: user.id }));
    }
  }, []);

  useEffect(() => {
    if (customersList && customersList.length > 0 && customers?.length === 0) {
      setCustomers(customersList);
    }
  }, []);

  useEffect(() => {
    if (customersError && customersError.length > 0) {
      setError(customersError);
    }
  }, [customersError]);

  useEffect(() => {
    if (search.length > 0 && customers) {
      const data = [...customers];
      const res = data.filter((cus) =>
        cus.user_name.toLowerCase().includes(search.toLowerCase())
      );
      setCustomers(res);
    } else {
      setCustomers(customersList);
    }
  }, [search]);

  const handleAddCustomer = async (item: IUser) => {
    if (user) {
      let res = await addCustomer({ user_id: user.id, relevant_id: item.id });
      if (res.message) {
        dispatch(fetchListShopkeeperCustomerRequest({ user_id: user.id }));
        dispatch(fetchListCustomerRequest({ user_id: user.id }));
        goBack();
      } else if (res.error) {
        console.log('res.error', res.error);
      }
    }
  };

  const RenderedItemsData = ({ item, index }) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '4%',
          borderBottomWidth: 0.5,
          borderBottomColor: 'grey',
        }}
      >
        <View
          style={{
            width: '18%',
            display: 'flex',
          }}
        >
          {item.image ? (
            <Image
              source={{ uri: ENV_VAR.baseUrl + item.image }}
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
            width: '65%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text style={{ fontSize: 20, marginTop: '3%' }}>
            {item.owner_name?.toUpperCase()}
          </Text>
          <Text style={{ marginTop: '-7%' }}>Shop Name: {item.shop_name}</Text>
          <Text>Email: {item.email}</Text>
        </View>
        <View
          style={{
            width: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => handleAddCustomer(item)}
            style={{ marginRight: '14%' }}
          >
            <MaterialCommunityIcons name="check" color="green" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
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
          <Text style={styles.titleWelcomeText}>
            Add {user?.user_type === 'shop_keeper' ? 'Customers' : 'Shop Keepers'}
          </Text>
        </View>
        <Text style={styles.titleSignText}>
        Find Your {user?.user_type === 'shop_keeper' ? 'Customers' : 'Shop Keepers'}
        </Text>
      </View>
      <View style={styles.inputFieldsMainView}>
        <View
          style={{
            ...styles.inputFieldSubView,
          }}
        >
          <MaterialCommunityIcons
            name="search-web"
            size={24}
            style={{ paddingTop: '3%', paddingHorizontal: '3%' }}
          />
          <TextInputNative
            onChangeText={(text: string) => setSearch(text)}
            placeholder="Search Customer..."
            style={{ width: '85%' }}
            maxLength={15}
          />
        </View>
      </View>
      <FlatList
        data={customersList}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index + ''}
        ListFooterComponent={
          customersPending ? (
            <ActivityIndicator size="large" color="#27428B" />
          ) : (
            <></>
          )
        }
        ListFooterComponentStyle={{ flexGrow: 1, paddingTop: '10%' }}
        renderItem={({ item, index }) => (
          <RenderedItemsData item={item} index={index} />
        )}
        ListEmptyComponent={<EmptyContainer isLoading={customersPending} />}
      />
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
    height: 140,
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
  flatListContainer: {
    width: '98%',
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: '2%',
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  inputFieldsMainView: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFieldSubView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '98%',
    marginVertical: '4%',
    borderWidth: 1,
    height: 50,
  },
  labelText: {
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    color: 'grey',
  },
});
