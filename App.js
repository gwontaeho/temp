import React, {useCallback, useEffect} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, Text} from 'react-native';
import {NativeBaseProvider} from 'native-base';

import {Home, Feed, Sign, Post, Ranking, Settings, User, Write} from '#screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen
      name="Feed"
      component={Feed}
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Write')}>
            <Text>글쓰기</Text>
          </TouchableOpacity>
        ),
      }}
    />
    <Tab.Screen name="Ranking" component={Ranking} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Sign" component={Sign} />
          <Stack.Screen name="Write" component={Write} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
