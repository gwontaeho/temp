import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Main from './main';
import Info from './info';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Info" component={Info} />
    </Tab.Navigator>
  );
};

export default Home;
