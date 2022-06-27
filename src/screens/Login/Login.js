import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

import {gql, useQuery} from '@apollo/client';

import {
  login,
  logout,
  getProfile,
  unlink,
} from '@react-native-seoul/kakao-login';
import {Input, Divider, Button} from 'native-base';

const GET_USER = gql`
  query {
    users {
      id
    }
  }
`;

export const Login = ({navigation}) => {
  const {data} = useQuery(GET_USER);
  console.log(data);

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

  const handlePressLink = useCallback(async () => {
    try {
      await unlink();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePressApple = useCallback(async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleAuthRequestResponse);

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>이메일</Text>
      <Input size="2xl" />
      <Text>비밀번호</Text>
      <Input size="2xl" />
      <Pressable onPress={() => navigation.navigate('Password_Reset')}>
        <Text>비밀번호를 잃어버리셨나요?</Text>
      </Pressable>
      <Button onPress={handlePressLogin}>로그인</Button>
      <Button onPress={handlePressLink}>링크해제</Button>
      <Button onPress={() => navigation.navigate('Signup')}>회원가입</Button>
      <View style={styles.oauthContainer}>
        <Text>카카오</Text>
        <Text>구글</Text>
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={handlePressApple}
        />
      </View>
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
