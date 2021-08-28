import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { TextInput, Button } from "react-native-paper";
import { Text, View } from "../Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { fetchUserRequest } from "../../store/auth/actions";
import {
  getErrorSelector,
  getPendingSelector,
  getUserSelector,
} from "../../store/auth/selector";

export default function LogiScreen() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const userData = useSelector(getUserSelector);
  const isPending = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);

  const handleLogin = () => {
    console.log("Pressed");
    if (username.length !== 0 && password.length !== 0) {
      const data = {
        user_name: username,
        password: password,
      };
      dispatch(fetchUserRequest(data));
    }
  };
  console.log("userData", userData);
  console.log("userDataerror", error);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{ width: "96%", alignItems: "center", justifyContent: "center" }}
      >
        <TextInput
          mode="outlined"
          label="UserName"
          onChangeText={(text) => setUsername(text)}
          style={{ width: "80%" }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(text) => setPassword(text)}
          style={{ width: "80%", marginTop: "5%" }}
        />
        <Button
          style={{
            width: "60%",
            marginTop: "10%",
            padding: "2%",
          }}
          icon={() => (
            <MaterialCommunityIcons name="login" size={32} color="white" />
          )}
          mode="contained"
          onPress={handleLogin}
        >
          <Text style={{ fontSize: 30, color: "white" }}>Login</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    flex: 1,
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
  inputField: {
    borderRadius: 20,
    width: "95%",
  },
});
