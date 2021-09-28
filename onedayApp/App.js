import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/home';
import Category from './screens/category';
import Product from './screens/product';
import Payment from './screens/payment';
import Login from './screens/login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
