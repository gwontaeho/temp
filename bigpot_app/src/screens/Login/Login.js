import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {useHeaderHeight} from '@react-navigation/elements';

import {gql, useQuery} from '@apollo/client';
import {
  login,
  logout,
  getProfile,
  unlink,
} from '@react-native-seoul/kakao-login';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Input, Button, Text, VStack, HStack, Flex} from 'native-base';

const GET_USER = gql`
  query {
    users {
      id
    }
  }
`;

export const Login = ({navigation}) => {
  const {data} = useQuery(GET_USER);

  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Flex p={5} bg="#fff" flex={1}>
        <VStack space={10}>
          <Text fontSize="4xl">Bigpot</Text>
          <VStack space={2.5}>
            <Text>이메일</Text>
            <Input value={email} onChangeText={text => setEmail(text)} />
            <Text>비밀번호</Text>
            <Input value={password} onChangeText={text => setPassword(text)} />
            <Text
              onPress={() => navigation.navigate('Password_Reset')}
              alignSelf="flex-end">
              비밀번호를 잃어버리셨나요?
            </Text>
          </VStack>
          <VStack space={2.5}>
            <Button size="lg" onPress={handlePressLogin}>
              로그인
            </Button>
            <Button size="lg" onPress={() => navigation.navigate('Signup')}>
              회원가입
            </Button>
          </VStack>
          <HStack justifyContent="center" space={2.5}>
            <Button>카카오</Button>
            <Button>구글</Button>
            <Button onPress={handlePressApple}>애플</Button>
          </HStack>
        </VStack>
      </Flex>
    </TouchableWithoutFeedback>
  );
};
