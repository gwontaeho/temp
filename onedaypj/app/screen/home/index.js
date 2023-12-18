import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Main from './main';
import Info from './info';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: '클래스',
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="person-outline" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
