import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, logout, getProfile} from '@react-native-seoul/kakao-login';

export const Login = () => {
  const handlePressLogin = useCallback(async () => {
    console.log('a');
    try {
      const KakaoOAuthToken = await login();
      const KaKaoProfile = await getProfile();
      console.log(KakaoOAuthToken);
      console.log(KaKaoProfile);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePressLogout = useCallback(async () => {
    try {
      const LogoutResult = await logout();
      console.log(LogoutResult);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Login</Text>
      </View>
      <Pressable onPress={handlePressLogin}>
        <Text>로그인</Text>
      </Pressable>
      <Pressable onPress={handlePressLogout}>
        <Text>로그아웃</Text>
      </Pressable>
    </ScrollView>
  );
};
