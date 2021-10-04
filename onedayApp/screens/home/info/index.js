import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles from './styles';

const Main = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('abc');
      check();
    });

    return unsubscribe;
  }, [props.navigation]);

  const check = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('jsonValue');
      if (jsonValue !== null) {
        setUser(jsonValue);
      }
      console.log('--------------------------------------------');
      console.log(jsonValue);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logInOut = useCallback(async () => {
    if (Object.keys(user).length === 0) {
      props.navigation.navigate('Login', {});
    } else {
      try {
        await AsyncStorage.removeItem('jsonValue');
        setUser({});
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.navigation, user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>마이페이지</Text>
      </View>

      <TouchableOpacity style={styles.line} onPress={logInOut}>
        <Text>{Object.keys(user).length === 0 ? '로그인' : '로그아웃'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
