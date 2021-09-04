import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Text, View } from '@app/screens/Themed';
import { getUserSelector } from '@app/store/auth/selector';
import { Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '@app/navigation/NavigationTypes';

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const userData = useSelector(getUserSelector);
  const logout = () => {
    navigation.navigate('Root');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Welcome {userData.data?.user_name}</Text>
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
