import React, {useCallback, useEffect, useState} from 'react';
import {TouchableWithoutFeedback, Keyboard, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@apollo/client';
import {useHeaderHeight} from '@react-navigation/elements';
import {CREATE_USER} from '#apollo/gql';

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
  Checkbox,
  HStack,
} from 'native-base';

export const Signup = ({navigation}) => {
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState('');
  const [certification, setCertification] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: async data => {
      const {user, token} = data.signup;
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('Home');
    },
    onError: error => console.error(error),
  });

  const handlePressCreate = useCallback(async () => {
    console.log(email, password);
    await createUser({
      variables: {
        email,
        password,
      },
    });
  }, [email, password, passwordCheck]);

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView
        flex={1}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}>
        <ScrollView
          flex={1}
          bg="#fff"
          borderWidth={1}
          _contentContainerStyle={{p: 5}}>
          <VStack space={2.5}>
            <Text fontSize="2xl">회원가입</Text>
            <Text>이메일</Text>
            <Input
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              InputRightElement={
                <Button rounded="none" h="full">
                  인증번호 전송
                </Button>
              }
            />
            <Input
              keyboardType="number-pad"
              value={certification}
              onChangeText={text => setCertification(text)}
              InputRightElement={
                <Button rounded="none" h="full">
                  인증번호 확인
                </Button>
              }
            />
            <Text>비밀번호</Text>
            <Input value={password} onChangeText={text => setPassword(text)} />
            <Input
              value={passwordCheck}
              onChangeText={text => setPasswordCheck(text)}
            />
          </VStack>

          <VStack space={2.5}>
            <Flex direction="row" justify="space-between">
              <Text>약관 전체 동의</Text>
              <Checkbox />
            </Flex>
            <Divider />
            <Flex direction="row" justify="space-between">
              <HStack space={1}>
                <Text bold>[필수]</Text>
                <Text>개인정보 수집 및 이용동의</Text>
                <Text underline>전문보기</Text>
              </HStack>
              <Checkbox />
            </Flex>
            <Flex direction="row" justify="space-between">
              <HStack space={1}>
                <Text bold>[필수]</Text>
                <Text>서비스 이용약관</Text>
                <Text underline>전문보기</Text>
              </HStack>
              <Checkbox />
            </Flex>
            <Flex direction="row" justify="space-between">
              <HStack space={1}>
                <Text bold>[선택]</Text>
                <Text>마케팅 활용 및 광고정보 수신 동의</Text>
                <Text underline>전문보기</Text>
              </HStack>
              <Checkbox />
            </Flex>
          </VStack>
        </ScrollView>
        <Button onPress={handlePressCreate}>회원가입</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
