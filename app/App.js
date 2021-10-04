import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screen/home';
import Login from './screen/login';
import Category from './screen/category';
import Product from './screen/product';
import Reservation from './screen/reservation';
import Qna from './screen/qna';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Reservation" component={Reservation} />
        <Stack.Screen name="Qna" component={Qna} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
