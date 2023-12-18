import React, {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid, Linking, Alert} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider, extendTheme} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import {AuthContext} from '@contexts';
import {Sign, Block, Inquiry, ErrorScreen, Terms} from '@screens/common';
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
  CDeleted,
  CDeletedShare,
  CReview,
} from '@screens/company';
import {URequest, USettings} from '@screens/user';
import {getUser} from '@apis';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  },
});

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
  const [permissions, setPermissions] = useState({location: false});

  const isSigned = auth?.isSigned;

  useEffect(() => {
    PushNotification.createChannel({channelId: 'pnc', channelName: 'pnc'});

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        const title = remoteMessage.notification.title;
        const message = remoteMessage.notification.body;
        PushNotification.localNotification({
          channelId: 'pnc',
          title,
          message,
        });
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getInitialURL();
  }, []);

  const getInitialURL = async () => {
    const url = await Linking.getInitialURL();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') requestAuthorization();
    if (Platform.OS === 'android') requestPermissionsAndroid();
  }, []);

  const requestPermissionsAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
        setPermissions(prev => ({...prev, location: true}));
      else setPermissions(prev => ({...prev, location: false}));
    } catch (err) {
      console.warn(err);
    }
  };

  const requestAuthorization = async () => {
    try {
      const res = await Geolocation.requestAuthorization('always');
      if (res === 'granted')
        setPermissions(prev => ({...prev, location: true}));
      else setPermissions(prev => ({...prev, location: false}));
    } catch (error) {
      console.log(error);
    }
  };

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth');
      if (jsonValue !== null) {
        const parsed = JSON.parse(jsonValue);
        const id = parsed?.id;
        axios.defaults.headers.common['Authorization'] = parsed.token;
        const {user, token, date} = await getUser(id);
        const auth = {...user, token, date, isSigned: true};
        const newJsonValue = JSON.stringify(auth);
        await AsyncStorage.setItem('auth', newJsonValue);
        setAuth(auth);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async value => {
    try {
      const auth = {...value, isSigned: true, initSign: true};
      const token = auth?.token;
      axios.defaults.headers.common['Authorization'] = token;
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

  const isTerms = isSigned && auth.terms === false;
  const isBlocked = isSigned && auth.status === 0;
  const isInquiry = isSigned && auth.status === 2;
  const isUser = isSigned && auth.status === 1 && auth.role === 1;
  const isCompany = isSigned && auth.status === 1 && auth.role === 2;
  const isAdmin = isSigned && auth.status === 1 && auth.role === 9;
  const isError =
    isSigned && !isBlocked && !isInquiry && !isUser && !isCompany && !isAdmin;

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{auth, signIn, signOut, permissions, getData, setAuth}}>
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
              {isTerms && (
                <Stack.Screen
                  name="Terms"
                  component={Terms}
                  options={{title: '약관 동의'}}
                />
              )}
              {isError && (
                <Stack.Screen
                  name="Error"
                  component={ErrorScreen}
                  options={{headerShown: false}}
                />
              )}
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
                    options={{title: '인근 요청'}}
                  />
                  <Stack.Screen
                    name="CShareCreate"
                    component={CShareCreate}
                    options={{title: '콜 공유하기'}}
                  />
                  <Stack.Screen
                    name="CShare"
                    component={CShare}
                    options={{headerTitle: '콜 공유'}}
                  />
                  <Stack.Screen
                    name="CHistory"
                    component={CHistory}
                    options={{title: '매칭 리스트'}}
                  />
                  <Stack.Screen
                    name="CPrices"
                    component={CPrices}
                    options={{headerTitle: '단가 관리'}}
                  />
                  <Stack.Screen
                    name="CDeleted"
                    component={CDeleted}
                    options={{headerTitle: '이용 내역'}}
                  />
                  <Stack.Screen
                    name="CDeletedShare"
                    component={CDeletedShare}
                    options={{headerTitle: '공유 내역'}}
                  />
                  <Stack.Screen
                    name="CReview"
                    component={CReview}
                    options={{headerTitle: '리뷰 작성'}}
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
