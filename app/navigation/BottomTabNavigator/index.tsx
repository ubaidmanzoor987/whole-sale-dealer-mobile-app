import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '@app/constants/Colors';
import useColorScheme from '@app/hooks/useColorScheme';
import BrandScreen from '@app/screens/BrandScreen';
import ProductScreen from '@app/screens/ProductScreen';
import AddEditProductScreen from '@app/screens/ProductScreen/AddEditProductScreen';
import {
  BottomTabParamList,
  ProfileStacksList,
  ProductStacksList,
  BrandStacksList
} from '../NavigationTypes';
import ProfileScreen from '@app/screens/ProfileScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Products"
      tabBarOptions={{ activeTintColor: Colors[colorScheme]?.tint }}
    >
      <BottomTab.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="aperture" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Brands"
        component={BrandNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-library" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BrandStack = createStackNavigator<BrandStacksList>();
const ProductStack = createStackNavigator<ProductStacksList>();
const ProfileStack = createStackNavigator<ProfileStacksList>();

function BrandNavigator() {
  return (
    <BrandStack.Navigator screenOptions={{ headerShown: false }}>
      <BrandStack.Screen name="BrandScreen" component={BrandScreen} />
    </BrandStack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function ProductNavigator(){
  return (
    <ProductStack.Navigator screenOptions ={{ headerShown: false }}>
      <ProductStack.Screen name="ProductScreen" component={ProductScreen} />
      <ProductStack.Screen name="AddEditProductScreen" component={AddEditProductScreen} />
    </ProductStack.Navigator>
  )
}