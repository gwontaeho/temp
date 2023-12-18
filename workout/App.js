import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, Text, Button} from 'react-native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Provider, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {store} from '#redux/app/store';
import {setToken} from '#redux/features/token/tokenSlice';
import {
  Feed,
  Sign,
  Post,
  Ranking,
  Settings,
  User,
  Write_Image,
  Write_Text,
  Board,
  Follow,
  Message,
  Room,
} from '#screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => <Text>{route.name}</Text>,
        tabBarShowLabel: false,
      })}>
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
      <Tab.Screen name="Board" component={Board} />
      {/* <Tab.Screen name="Shop" component={Board} /> */}
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const Root = () => {
  const dispatch = useDispatch();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#cccccc',
      card: '#cccccc',
    },
  };

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
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Write_Image" component={Write_Image} />
        <Stack.Screen name="Write_Text" component={Write_Text} />
        <Stack.Screen name="Follow" component={Follow} />
        <Stack.Screen name="Room" component={Room} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const theme = extendTheme({});

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Root />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
