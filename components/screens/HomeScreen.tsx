import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { getUserSelector } from "../../store/auth/selector";

export default function HomeScreen() {
  const userData = useSelector(getUserSelector);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Welcome {userData.data?.user_name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
