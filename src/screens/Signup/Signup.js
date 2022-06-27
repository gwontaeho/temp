import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {Input, Button} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@apollo/client';
import {CREATE_USER} from '#apollo/gql';

export const Signup = ({navigation}) => {
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
    <ScrollView>
      <View>
        <Text>회원가입</Text>
      </View>
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
      <Text>비밀번호확인</Text>
      <Input
        size="2xl"
        value={passwordCheck}
        onChangeText={text => setPasswordCheck(text)}
      />
      <Button onPress={handlePressCreate}>회원가입</Button>
    </ScrollView>
  );
};
