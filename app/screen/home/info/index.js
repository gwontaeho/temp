import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const Main = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      check();
    });
    return unsubscribe;
  }, []);

  const check = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('jsonValue');
      if (jsonValue !== null) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logInOut = useCallback(async () => {
    if (Object.keys(user).length === 0) {
      props.navigation.navigate('Login');
    } else {
      try {
        await AsyncStorage.removeItem('jsonValue');
        setUser({});
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const onPressHistory = useCallback(() => {
    props.navigation.navigate('History', {
      user,
    });
  }, [user]);

  const onPressQna = useCallback(() => {
    props.navigation.navigate('Qna', {user});
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>마이페이지</Text>
      </View>

      <TouchableOpacity style={styles.line} onPress={logInOut}>
        <Text>{Object.keys(user).length === 0 ? '로그인' : '로그아웃'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.line} onPress={onPressHistory}>
        <Text>예약 내역</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.line} onPress={onPressQna}>
        <Text>문의 내역</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
