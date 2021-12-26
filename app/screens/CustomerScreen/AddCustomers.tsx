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
} from 'react-native';
import { Avatar, Card } from 'react-native-paper';
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
import { IUser } from '@app/store/user/login/types';

export default function AddCustomerScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const customersList = useSelector(getCustomersListDataSelector);
  const customersPending = useSelector(getCustomersListPendingSelector);
  const customersError = useSelector(getCustomersListErrorSelector);
  const [error, setError] = useState<string>('');

  const [search, setSearch] = useState<string>('');
  const [customers, setCustomers] = useState<Array<IUser> | null>([]);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (user && user.id && customersList && customersList.length == 0) {
      dispatch(fetchListCustomerRequest({ user_id: user.id }));
    }
  }, [dispatch, user, customersList?.length === 0]);

  useEffect(() => {
    if (customersList && customersList.length > 0 && customers?.length === 0) {
      setCustomers(customersList);
    }
  }, [customersList]);

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

  const RenderedItemsData = ({ item, index }) => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          height: 140,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: '15%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.image ? (
            <Image
              source={{ uri: ENV_VAR.baseUrl + item.image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
          ) : (
            <MaterialCommunityIcons name="face-profile" size={50} />
          )}
        </View>
        <View
          style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 24 }}>{item.user_name?.toUpperCase()}</Text>
          <Text>{item.shop_name}</Text>
          <Text>{item.email}</Text>
          <Text>Address: {item.address}</Text>
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
          <TouchableOpacity onPress={() => {}} style={{ marginRight: '14%' }}>
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
          <Text style={styles.titleWelcomeText}>Add Customers</Text>
        </View>
        <Text style={styles.titleSignText}>Find Your Customers</Text>
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
      <ScrollView style={styles.flatListContainer}>
        {customersPending && (
          <View style={{ height: 200 }}>
            <ActivityIndicator size={24} color="#5460E0" />
          </View>
        )}
        {customers?.map((item, index) => (
          <RenderedItemsData item={item} index={index} key={item.id} />
        ))}
      </ScrollView>
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
    marginTop: '2%',
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 20,
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
