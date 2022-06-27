import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {View} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloProvider} from '@apollo/client';
import {store} from '#redux/app/store';
import {setToken} from '#redux/features/token/tokenSlice';
import {client} from '#apollo/client';

import {
  Home,
  Artists,
  Fundings,
  Settings,
  Login,
  Funding,
  Artist,
  Deposit,
  Deposit_Account,
  Deposit_Virtual,
  Signup,
  Payment,
  Payment_Check,
  Payment_Complete,
  Password_Reset,
} from '#screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const toastConfig = {
  custom: props => (
    <View style={{height: 60, width: '90%', backgroundColor: 'black'}} />
  ),
};

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Funding" component={Funding} />
        <Stack.Screen name="Artist" component={Artist} />
        <Stack.Screen name="Deposit" component={Deposit} />
        <Stack.Screen name="Deposit_Account" component={Deposit_Account} />
        <Stack.Screen name="Deposit_Virtual" component={Deposit_Virtual} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Payment_Check" component={Payment_Check} />
        <Stack.Screen name="Payment_Complete" component={Payment_Complete} />
        <Stack.Screen name="Password_Reset" component={Password_Reset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabs = ({navigation}) => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Fundings" component={Fundings} />
    <Tab.Screen name="Artists" component={Artists} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NativeBaseProvider>
          <Root />
          <Toast config={toastConfig} />
        </NativeBaseProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
