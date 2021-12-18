import React, { useState, useEffect } from 'react';
import AsyncStorgage from '@react-native-async-storage/async-storage'
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';

import { Text, View, Image } from '@app/screens/Themed';
import { RootStackParamList } from '@app/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux'
import { userAutoLogin } from '@app/store/user/login/actions'

function RootScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  const dispatch = useDispatch();

  useEffect(()=>{
    const autoLogin = async ()=>{
      let user = await AsyncStorgage.getItem('user') || '' as any;
      console.log("user", user);
      if(user !== ''){
        user = JSON.parse(user);
        dispatch(userAutoLogin(user))
        navigation.navigate('Home');
      }
    }

    autoLogin();

  },[]);

  
  const navigateToLogin = () => {
    navigation.navigate('LogIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('@app/assets/images/main.jpeg')}
        style={styles.imageStyle}
      />
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={{ color: 'grey', paddingLeft: '5%' }}>
        A Business To Business Mobile App. Where Customers Meets Shopkeepers.
      </Text>
      <View style={styles.viewToucableOpacity}>
        <TouchableOpacity
          style={{
            ...styles.touchableOpacity,
            borderColor: 'black',
            borderWidth: 1,
          }}
          activeOpacity={0.4}
          onPress={navigateToLogin}
        >
          <Text style={styles.touchableOpacityTextSignIn}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.touchableOpacity, backgroundColor: '#5460E0' }}
          activeOpacity={0.4}
          onPress={navigateToSignUp}
        >
          <Text style={styles.touchableOpacityTextSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default React.memo(RootScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: Constants.statusBarHeight,
  },
  imageStyle: {
    width: '98%',
    height: '50%',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 50,
    paddingLeft: '5%',
  },
  viewToucableOpacity: {
    width: '98%',
    paddingHorizontal: '4%',
    display: 'flex',
    marginTop: '5%',
    flexDirection: 'column',
  },
  touchableOpacity: {
    borderRadius: 30,
    height: '18%',
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacityTextSignUp: {
    color: 'white',
    fontWeight: 'bold',
  },
  touchableOpacityTextSignIn: {
    color: 'black',
    fontWeight: 'bold',
  },
});
