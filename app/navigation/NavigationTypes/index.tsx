/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Home: undefined;
  NotFound: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  AddProductScreen: undefined;
};

export type BottomTabParamList = {
  Products: undefined;
  Brands: undefined;
  Profile: undefined;
  Customers: undefined;
  Shopkeepers: undefined;
  CustomerProduct: undefined;
  Favourites: undefined;
  Cart: undefined;
};

export type BrandStacksList = {
  BrandScreen: undefined;
  AddBrandScreen: undefined;
};

export type ProductStacksList = {
  ProductScreen: undefined;
  AddEditProductScreen: undefined;
};

export type HomeStacksList = {
  BrandScreen: undefined;
  AddBrandScreen: undefined;
};

export type ProfileStacksList = {
  ProfileScreen: undefined;
};

export type UserStacksList = {
  UserSceen: undefined;
  AddUserScreen: undefined;
};

export type ProductsCustomerStacksList = {
  CustomerProductScreen: undefined;
}

export type FavouritesStacksList = {
  FavouritesScreen: undefined;
}

export type CartStacksList = {
  CartScreen: undefined;
}

