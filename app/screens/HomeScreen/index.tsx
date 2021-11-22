import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Text, View } from '@app/screens/Themed';
import {
  getPendingSelector,
  getErrorSelector,
  getMessageSelector,
  getDataSelector,
} from '@app/store/user/login/selector';
import { Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '@app/navigation/NavigationTypes';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const dispatch = useDispatch();
  const isPending = useSelector(getPendingSelector);
  const errorMessage = useSelector(getErrorSelector);
  const message = useSelector(getMessageSelector);
  const user = useSelector(getDataSelector);

  // useEffect(() => {
  //   if (message == 'Logout Successfully') {
  //     navigation.navigate('Root');
  //     return;
  //   }
  // }, [message]);

  const logout = async () => {
    // const jsonValue = (await AsyncStorage.getItem('user')) ?? '';
    // const userData = JSON.parse(jsonValue) as IUserData;
    // let user_type = (await AsyncStorage.getItem('user_type')) ?? '';
    // user_type = JSON.parse(user_type);
    // const reqData = {
    //   user_name: userData.user_name,
    //   token: userData.token,
    //   user_type: user_type,
    // } as requestUserLogout;
    // dispatch(fetchUserLogoutRequest(reqData));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Welcome {user?.user_name}</Text>
      <Button
        style={{ backgroundColor: 'green', marginTop: 50 }}
        onPress={logout}
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
