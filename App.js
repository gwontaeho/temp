import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '@contexts';
import {Sign, Block, Inquiry} from '@screens/common';
import {
  ADashboard,
  ACompanies,
  AUsers,
  AInquiries,
  ASettings,
  ACompany,
} from '@screens/admin';
import {
  CRequest,
  CHistory,
  CHistories,
  CSettings,
  CRequests,
  CShares,
  CShareCreate,
  CShare,
  CPrices,
} from '@screens/company';
import {URequest, USettings} from '@screens/user';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 관리자
const ATabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {display: 'none'},
        tabBarLabelPosition: 'beside-icon',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="ADashboard"
        component={ADashboard}
        options={{
          tabBarLabel: '대시보드',
        }}
      />
      <Tab.Screen
        name="ASettings"
        component={ASettings}
        options={{
          tabBarLabel: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

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
        name="CHistories"
        component={CHistories}
        options={{
          tabBarLabel: '매칭리스트',
        }}
      />
      <Tab.Screen
        name="CShares"
        component={CShares}
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
  const isSigned = auth?.isSigned;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') requestAuthorization();
  }, []);

  const requestAuthorization = async () => {
    await Geolocation.requestAuthorization('always');
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
      console.log(auth);
    } catch (error) {}
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      setAuth(null);
    } catch (error) {}
  };

  const isBlocked = isSigned && auth.status === 0;
  const isInquiry = isSigned && auth.status === 2;
  const isUser = isSigned && auth.status === 1 && auth.role === 1;
  const isCompany = isSigned && auth.status === 1 && auth.role === 2;
  const isAdmin = isSigned && auth.status === 1 && auth.role === 9;

  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{auth, signIn, signOut}}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
              {isBlocked && (
                <Stack.Screen
                  name="Block"
                  component={Block}
                  options={{headerShown: false}}
                />
              )}
              {isInquiry && (
                <Stack.Screen
                  name="Inquiry"
                  component={Inquiry}
                  options={{headerShown: false}}
                />
              )}
              {isAdmin && (
                <>
                  <Stack.Screen
                    name="Tabs"
                    component={ATabs}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ACompanies"
                    component={ACompanies}
                    options={{title: '업체 관리'}}
                  />
                  <Stack.Screen
                    name="AUsers"
                    component={AUsers}
                    options={{title: '회원 관리'}}
                  />
                  <Stack.Screen
                    name="AInquiries"
                    component={AInquiries}
                    options={{title: '업체등록 문의'}}
                  />
                  <Stack.Screen
                    name="ACompany"
                    component={ACompany}
                    options={{title: '업체 상세'}}
                  />
                </>
              )}
              {isCompany && (
                <>
                  <Stack.Screen
                    name="Tabs"
                    component={CTabs}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="CRequest"
                    component={CRequest}
                    options={{title: ''}}
                  />
                  <Stack.Screen
                    name="CShareCreate"
                    component={CShareCreate}
                    options={{title: '콜 공유하기'}}
                  />
                  <Stack.Screen
                    name="CShare"
                    component={CShare}
                    options={{headerTitle: ''}}
                  />
                  <Stack.Screen
                    name="CHistory"
                    component={CHistory}
                    options={{headerTitle: ''}}
                  />
                  <Stack.Screen
                    name="CPrices"
                    component={CPrices}
                    options={{headerTitle: '단가 관리'}}
                  />
                </>
              )}
              {isUser && (
                <Stack.Screen
                  name="Tabs"
                  component={UTabs}
                  options={{headerShown: false}}
                />
              )}
              {!isSigned && (
                <Stack.Screen
                  name="Sign"
                  component={Sign}
                  options={{headerShown: false}}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default App;
