import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {Input, Button} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '#api';

export const Sign = ({navigation}) => {
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
        `+44 7444 555666`,
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
      console.log(response.data);

      // async storage에 회원토큰 저장

      const jsonValue = JSON.stringify({token: response.data});
      await AsyncStorage.setItem('user', jsonValue);

      navigation.navigate('Tabs');
    } catch (error) {
      console.log('Invalid code.');
    }
  }, [confirm, code]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {confirm ? (
            <>
              <Input
                size="2xl"
                maxLength={6}
                value={code}
                onChangeText={text => setCode(text)}
                style={styles.input}
              />
              <Button onPress={handlePressConfirm}>인증번호 확인</Button>
            </>
          ) : (
            <>
              <Input
                keyboardType="number-pad"
                size="2xl"
                maxLength={11}
                value={phone}
                onChangeText={text => setPhone(text)}
                style={styles.input}
              />
              <Button onPress={handlePressSend}>인증번호 전송</Button>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
  },
});
