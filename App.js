import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, Text} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {store} from '#redux/app/store';
import {setToken} from '#redux/features/token/tokenSlice';
import {Feed, Sign, Post, Ranking, Settings, User, Write, Qna} from '#screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (token) dispatch(setToken(token));
      } catch (error) {
        // error reading value
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Write" component={Write} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabs = ({navigation}) => {
  return (
    <Tab.Navigator>
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
      <Tab.Screen name="Qna" component={Qna} />
      <Tab.Screen name="Ranking" component={Ranking} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Root />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
