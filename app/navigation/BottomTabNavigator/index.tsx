import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '@app/constants/Colors';
import useColorScheme from '@app/hooks/useColorScheme';
import BrandScreen from '@app/screens/BrandScreen';
import ProductScreen from '@app/screens/ProductScreen';
import AddEditProductScreen from '@app/screens/ProductScreen/AddEditProductScreen';
import {
  BottomTabParamList,
  ProfileStacksList,
  ProductStacksList,
  BrandStacksList,
  UserStacksList,
  ProductsCustomerStacksList,
  FavouritesStacksList,
  CartStacksList,
  OrderStacksList,
} from '../NavigationTypes';
import ProfileScreen from '@app/screens/ProfileScreen';
import UserScreen from '@app/screens/ListUsers';
import AddUserScreen from '@app/screens/ListUsers/AddUser';
import {
  FavouritesScreen,
  CustomerProductsScreen,
  CartScreen,
  CheckoutScreen,
  OrdersScreen
} from '@app/screens/Customer/index';

import { getDataSelector as getUserSelector } from '@app/store/user/login/selector';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const user = useSelector(getUserSelector);

  return (
    <BottomTab.Navigator
      initialRouteName="Products"
      tabBarOptions={{ activeTintColor: Colors[colorScheme]?.tint }}
    >
      <BottomTab.Screen
        name="Products"
        component={
          user?.user_type === 'shop_keeper'
            ? ProductNavigator
            : CustomerProductNavigator
        }
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="aperture" color={color} />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="CustomerProduct"
        component={CustomerProductNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="aperture" color={color} />
          ),
        }}
      /> */}
      {user?.user_type === 'shop_keeper' && (
        <BottomTab.Screen
          name="Brands"
          component={BrandNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="md-library" color={color} />
            ),
          }}
        />
      )}
      {user?.user_type === 'customer' && (
        <BottomTab.Screen
          name="Favourites"
          component={FavouritesNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="heart" color={color} />
            ),
          }}
        />
      )}
      {user?.user_type === 'customer' && (
        <BottomTab.Screen
          name="Cart"
          component={CartNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
          }}
        />
      )}
      <BottomTab.Screen
        name={user?.user_type === 'shop_keeper' ? 'Customers' : 'Shopkeepers'}
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="archive-outline" color={color} />
          ),
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
const UserStack = createStackNavigator<UserStacksList>();
const CustomerProductStack = createStackNavigator<ProductsCustomerStacksList>();
const FavouritesStack = createStackNavigator<FavouritesStacksList>();
const CartStack = createStackNavigator<CartStacksList>();
const OrderStack = createStackNavigator<OrderStacksList>();

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

function ProductNavigator() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductScreen" component={ProductScreen} />
      <ProductStack.Screen
        name="AddEditProductScreen"
        component={AddEditProductScreen}
      />
    </ProductStack.Navigator>
  );
}

function UserNavigator() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserSceen" component={UserScreen} />
      <UserStack.Screen name="AddUserScreen" component={AddUserScreen} />
    </UserStack.Navigator>
  );
}

function CustomerProductNavigator() {
  return (
    <CustomerProductStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerProductStack.Screen
        name="CustomerProductScreen"
        component={CustomerProductsScreen}
      />
    </CustomerProductStack.Navigator>
  );
}

function FavouritesNavigator() {
  return (
    <FavouritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavouritesStack.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
      />
    </FavouritesStack.Navigator>
  );
}

function CartNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartScreen" component={CartScreen} />
      <CartStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
}

function OrderNavigator() {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen name="OrderScreen" component={OrdersScreen} />
      <OrderStack.Screen name="ViewOrderScreen" component={CartScreen} />
    </OrderStack.Navigator>
  );
}