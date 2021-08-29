import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";

import { fetchUserRequest } from "../../store/auth/actions";
import { Text, View } from "../Themed";

import {
  getErrorSelector,
  getPendingSelector,
  getUserSelector,
} from "../../store/auth/selector";
import { RootStackParamList } from "../../types";

export default function LogiScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const userData = useSelector(getUserSelector);
  const isPending = useSelector(getPendingSelector);
  const errorMessageServer = useSelector(getErrorSelector);
  let passwordFocus = null as any;

  useEffect(() => {
    if (userData.msg == "Login Successfully" && userData.status === 0) {
      navigation.navigate("Home");
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
      };
      dispatch(fetchUserRequest(data));
    } else if (username.length === 0) {
      setErrorMessage("User Name is Required");
    } else if (password.length === 0) {
      setErrorMessage("Password is Required");
    }
  };

  const handleUsername = (text: string) => {
    if (text.length === 0) {
      setErrorMessage("User Name is Required ");
    } else {
      setErrorMessage("");
      setUsername(text);
    }
  };

  const handlePassoword = (text: string) => {
    if (text.length === 0) {
      setErrorMessage("Password is Required ");
    } else {
      setErrorMessage("");
      setPassword(text);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.inputFieldView}>
          <TextInput
            mode="outlined"
            label="UserName"
            onChangeText={handleUsername}
            style={styles.inputField}
            onSubmitEditing={() => {
              passwordFocus.focus();
            }}
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
                name={visiblePass === true ? "eye" : "eye-off"}
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
                color: "red",
                fontSize: 16,
                textAlign: "left",
                alignSelf: "flex-start",
                paddingLeft: 40,
                marginTop: "4%",
              }}
            >
              {errorMessage}
            </Text>
          ) : (
            <></>
          )}
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
                <MaterialCommunityIcons name="login" size={32} color="white" />
              )}
              mode="contained"
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Button>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 250,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "95%",
    backgroundColor: "red",
  },
  inputFieldView: {
    width: "96%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    width: "85%",
    marginTop: "5%",
  },
  loginButton: {
    width: "60%",
    marginTop: "10%",
    padding: "2%",
    borderRadius: 20,
    backgroundColor: "green",
  },
  loginButtonText: {
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
  },
  activitIndicator: {
    width: "60%",
    marginTop: "10%",
    padding: "2%",
  },
});
