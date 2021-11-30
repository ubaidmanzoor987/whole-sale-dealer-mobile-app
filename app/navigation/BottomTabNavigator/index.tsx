import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '@app/constants/Colors';
import useColorScheme from '@app/hooks/useColorScheme';
// import HomeScreen from '@app/screens/HomeScreen';
import BrandScreen from '@app/screens/BrandScreen';
import AddBrandScreen from '@app/screens/AddBrandScreen';
import TabTwoScreen from '@app/screens/BrandScreen';
import {
  BottomTabParamList,
  BrandParamList,
  TabTwoParamList,
} from '../NavigationTypes';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Brand"
      tabBarOptions={{ activeTintColor: Colors[colorScheme]?.tint }}
    >
      <BottomTab.Screen
        name="Brand"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="AddBrand"
        component={AddBrandNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="TabThree"
        component={TabTwoNavigator}
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

const HomeStack = createStackNavigator<BrandParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="BrandScreen" component={BrandScreen} />
    </HomeStack.Navigator>
  );
}

function AddBrandNavigator() {
  return(
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="AddBrandScreen" component={AddBrandScreen} />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={{ headerShown: false }}>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
