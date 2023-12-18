import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Input, Button, Text, KeyboardAvoidingView, VStack} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setToken} from '#redux/features/token/tokenSlice';
import api from '#api';

export const Sign = ({navigation}) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const handlePressSend = useCallback(async () => {
    // 인증번호 전송

    // if (phone.length < 11) return;

    try {
      //   const confirmation = await auth().signInWithPhoneNumber(`+82${phone}`);
      const confirmation = await auth().signInWithPhoneNumber(
        phone ? `+44 7444 555666` : '+44 7445 556666',
      );
      setConfirm(confirmation);
      console.log(confirmation);
    } catch (error) {
      console.log(error);
    }
  }, [phone]);

  const handlePressConfirm = useCallback(async () => {
    // 인증번호 확인

    try {
      //   const {user} = await confirm.confirm(code);
      const {user} = await confirm.confirm('123456');
      const {phoneNumber, uid} = user;

      // 회원가입 or 로그인
      const response = await api.post('user', {
        phone,
        fb_phone: phoneNumber,
        fb_uid: uid,
      });
      const token = response.headers.authorization;
      console.log(token);
      // async storage에 토큰 저장
      // redux storedp 토큰 저장

      await AsyncStorage.setItem('token', token);
      dispatch(setToken(token));
      navigation.navigate('Tabs');
    } catch (error) {
      console.log('Invalid code.');
    }
  }, [confirm, code]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      flex={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} flex={1}>
        <VStack
          justifyContent="center"
          alignItems="center"
          space={5}
          flex={1}
          p={5}>
          <Text fontSize="2xl">
            {confirm
              ? '인증번호 확인 후 로그인됩니다'
              : '휴대폰 번호를 입력해주세요'}
          </Text>
          <Input
            size="2xl"
            maxLength={6}
            value={confirm ? code : phone}
            onChangeText={text => (confirm ? setCode(text) : setPhone(text))}
          />
          <Button
            w="full"
            onPress={confirm ? handlePressConfirm : handlePressSend}>
            {confirm ? '로그인' : '인증번호 전송'}
          </Button>
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
