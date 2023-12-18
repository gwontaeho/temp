import React, {useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios';

import styles from './styles';

const Login = props => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/auth?id=${id}&password=${password}&type=1`,
      );

      const jsonValue = {token: response.data, id};

      if (response.status === 200) {
        try {
          await AsyncStorage.setItem('jsonValue', JSON.stringify(jsonValue));
          props.navigation.navigate('Main');
          console.log(props);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [props, id, password]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>로그인</Text>
      </View>

      <View style={styles.inputs}>
        <TextInput style={styles.input} onChangeText={setId} value={id} />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View style={styles.login}>
        <TouchableOpacity style={styles.login_button} onPress={onPressLogin}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
