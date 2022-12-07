import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Sign, Review} from '@screens/common';
import {
  CRequest,
  CHistory,
  CSettings,
  CRequests,
  CShare,
} from '@screens/company';
import {URequest, USettings} from '@screens/user';

import {AuthContext} from '@context';

import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 유저
const UTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {display: 'none'},
        tabBarLabelPosition: 'beside-icon',
        headerShown: false,
      }}>
      <Tab.Screen
        name="URequest"
        component={URequest}
        options={{
          tabBarLabel: '요청',
        }}
      />
      <Tab.Screen
        name="USettings"
        component={USettings}
        options={{
          tabBarLabel: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

// 업체
const CTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {display: 'none'},
        tabBarLabelPosition: 'beside-icon',
        headerShown: false,
      }}>
      <Tab.Screen
        name="CRequests"
        component={CRequests}
        options={{
          tabBarLabel: '인근요청',
        }}
      />
      <Tab.Screen
        name="CHistory"
        component={CHistory}
        options={{
          tabBarLabel: '매칭리스트',
        }}
      />
      <Tab.Screen
        name="CShare"
        component={CShare}
        options={{
          tabBarLabel: '공유하기',
        }}
      />
      <Tab.Screen
        name="CSettings"
        component={CSettings}
        options={{
          tabBarLabel: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') requestAuthorization();
    getUniqueId();
  }, []);

  const requestAuthorization = async () => {
    const asd = await Geolocation.requestAuthorization('always');
    console.log(asd);
  };

  const getUniqueId = async () => {
    const uniqueId = await DeviceInfo.getUniqueId();
    console.log(uniqueId);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth');
      if (jsonValue !== null) setAuth(JSON.parse(jsonValue));
    } catch (error) {}
  };

  const signIn = async value => {
    try {
      const auth = {...value, isSigned: true};
      const jsonValue = JSON.stringify(auth);
      await AsyncStorage.setItem('auth', jsonValue);
      setAuth(auth);
    } catch (error) {}
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      setAuth(null);
    } catch (error) {}
  };

  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={{auth, signIn, signOut}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {auth?.isSigned ? (
              <>
                <Stack.Screen name="Tabs" component={UTabs} />
              </>
            ) : (
              <Stack.Screen name="Sign" component={Sign} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
