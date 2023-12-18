import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screen/home';
import Login from './screen/login';
import Category from './screen/category';
import Product from './screen/product';
import Reservation from './screen/reservation';
import ReservationOk from './screen/reservation_ok';
import History from './screen/history';
import HistoryDetail from './screen/history_detail';
import Qna from './screen/qna';
import QnaDetail from './screen/qna_detail';
import Review from './screen/review';

console.disableYellowBox = true;

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
        <Stack.Screen name="ReservationOk" component={ReservationOk} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
        <Stack.Screen name="Qna" component={Qna} />
        <Stack.Screen name="QnaDetail" component={QnaDetail} />
        <Stack.Screen name="Review" component={Review} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
