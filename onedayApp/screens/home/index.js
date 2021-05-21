import React, {useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';

import Main from './main';
import Info from './info';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="main" component={Main} />
      <Tab.Screen name="info" component={Info} />
    </Tab.Navigator>
  );
};

export default Home;
