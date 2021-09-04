import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { fetchUserRequest } from '@app/store/auth/actions';
import { Text, View } from '@app/screens/Themed';

import {
  getErrorSelector,
  getPendingSelector,
  getUserSelector,
} from '@app/store/auth/selector';
import { RootStackParamList } from '@app/navigation/NavigationTypes';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogiScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [usertype, setUserType] = useState<string>('shop_keeper');

  const userData = useSelector(getUserSelector);
  const isPending = useSelector(getPendingSelector);
  const errorMessageServer = useSelector(getErrorSelector);
  let passwordFocus = null as any;

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = (await AsyncStorage.getItem('user')) ?? '';
        const result = JSON.parse(jsonValue);
        console.log('mount login screen');
        // if (result.type === 'success') {
        //   const data = {
        //     email: result.user.email,
        //     displayName: result.user.givenName + ' ' + result.user.familyName,
        //     givenName: result.user.givenName,
        //     familyName: result.user.familyName,
        //     googleId: result.user.id,
        //     imageUrl: result.user.photoUrl,
        //   } as requestUser;
        //   dispatch(fetchUserRequest(data));
        // }
      } catch (e) {
        // error reading value
      }
    };
    getData();

    if (userData.message == 'Login Successfully' && userData.data) {
      navigation.navigate('Home');
      return;
    }
  }, [userData.data]);

  useEffect(() => {
    if (errorMessageServer) {
      setErrorMessage(errorMessageServer);
    }
  }, [errorMessageServer]);

  const handleLogin = () => {
    if (username.length !== 0 && password.length !== 0) {
      const data = {
        user_name: username,
        password: password,
        user_type: usertype,
      };
      dispatch(fetchUserRequest(data));
    } else if (username.length === 0) {
      setErrorMessage('User Name is Required');
    } else if (password.length === 0) {
      setErrorMessage('Password is Required');
    }
  };

  const handleUsername = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('User Name is Required ');
    } else {
      setErrorMessage('');
      setUsername(text);
    }
  };

  const handlePassoword = (text: string) => {
    if (text.length === 0) {
      setErrorMessage('Password is Required ');
    } else {
      setErrorMessage('');
      setPassword(text);
    }
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn) {
      setUserType('customer');
    } else {
      setUserType('shop_keeper');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.inputFieldView}>
        <TextInput
          mode="outlined"
          label="User Name"
          error={errorMessage ? true : false}
          onChangeText={handleUsername}
          style={styles.inputField}
          onSubmitEditing={() => {
            passwordFocus.focus();
          }}
          placeholder="Enter Your User Name"
          blurOnSubmit={false}
        />
        <TextInput
          ref={(input) => {
            passwordFocus = input;
          }}
          mode="outlined"
          label="Password"
          onChangeText={handlePassoword}
          style={styles.inputField}
          secureTextEntry={!visiblePass}
          right={
            <TextInput.Icon
              name={visiblePass === true ? 'eye' : 'eye-off'}
              onPress={() => setVisiblePass(!visiblePass)}
            />
          }
          onSubmitEditing={() => {
            handleLogin();
          }}
        />
        {errorMessage ? (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              textAlign: 'left',
              alignSelf: 'flex-start',
              paddingLeft: '8%',
              paddingTop: '2%',
            }}
          >
            {errorMessage}
          </Text>
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '85%',
            marginVertical: '7%',
          }}
        >
          <Text style={{ flex: 1, paddingTop: '1%' }}>Switch To Client</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        {isPending ? (
          <ActivityIndicator
            size="large"
            color="blue"
            style={styles.activitIndicator}
          />
        ) : (
          <Button
            style={styles.loginButton}
            icon={() => (
              <MaterialCommunityIcons name="login" size={20} color="white" />
            )}
            mode="contained"
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Button>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default React.memo(LogiScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '95%',
    backgroundColor: 'red',
  },
  inputFieldView: {
    width: '96%',
    alignItems: 'center',
  },
  inputField: {
    width: '85%',
    marginTop: '5%',
  },
  loginButton: {
    width: '60%',
    height: '13%',
    borderRadius: 20,
    backgroundColor: 'green',
  },
  loginButtonText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: 'white',
  },
  activitIndicator: {
    width: '60%',
    marginTop: '10%',
    padding: '2%',
  },
});
