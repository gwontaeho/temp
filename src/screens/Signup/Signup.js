import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@apollo/client';
import {CREATE_USER} from '#apollo/gql';
import {useHeaderHeight} from '@react-navigation/elements';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

import {
  Input,
  Button,
  Text,
  View,
  ScrollView,
  Pressable,
  Flex,
  VStack,
  KeyboardAvoidingView,
  Divider,
} from 'native-base';

export const Signup = ({navigation}) => {
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: data => {
      navigation.navigate('Home');
    },
  });

  useEffect(() => {
    console.log(password);
    console.log(passwordCheck);
    console.log(email);
  }, [password, passwordCheck, email]);

  const handlePressCreate = useCallback(() => {
    createUser({
      variables: {
        email,
        password,
        role: 'INVESTOR',
      },
    });
  }, [email, password, passwordCheck]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Flex flex={1} p={5} bg="#fff">
        <VStack space={2.5}>
          <Text fontSize="4xl">Bigpot</Text>
          <Text>이메일</Text>
          <Input
            size="2xl"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text>비밀번호</Text>
          <Input
            size="2xl"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Input
            size="2xl"
            value={passwordCheck}
            onChangeText={text => setPasswordCheck(text)}
          />
        </VStack>
        <VStack space={2.5}>
          <Text>약관 전체 동의</Text>
          <Divider />
          <Text>[필수] 개인정보 수집 및 이용동의 전문보기</Text>
          <Text>[필수] 개인정보 수집 및 이용동의 전문보기</Text>
          <Text>[필수] 개인정보 수집 및 이용동의 전문보기</Text>
        </VStack>
        <Button onPress={handlePressCreate}>회원가입</Button>
      </Flex>
    </TouchableWithoutFeedback>
  );
};

{
  /* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
<Flex p={5} bg="#fff" flex={1}>
  <VStack space={10}>
    <Text fontSize="4xl">Bigpot</Text>
    <VStack space={2.5}>
      <Text>이메일</Text>
      <Input
        size="2xl"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text>비밀번호</Text>
      <Input
        size="2xl"
        value={password}
        onChangeText={text => setPassword(text)}
      />
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
</TouchableWithoutFeedback> */
}
