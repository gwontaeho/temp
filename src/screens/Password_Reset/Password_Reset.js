import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, logout, getProfile} from '@react-native-seoul/kakao-login';
import {Input, Divider, Button} from 'native-base';

export const Password_Reset = () => {
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
    <View style={styles.container}>
      <Text>비밀번호를 재설정합니다</Text>
      <Text>가입한 이메일 주소를 입력해주세요</Text>
      <Input size="2xl" />
      <Button>이메일로 변경</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  oauthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
