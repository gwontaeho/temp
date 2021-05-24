import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles from './styles';

const Main = () => {
  const [user, setUser] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(1);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
    }
  }, []);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const logInOut = useCallback(async () => {
    if (Object.keys(user).length === 0) {
      toggleModal();
    } else {
      console.log('로그아웃');
      try {
        await AsyncStorage.removeItem('user');
        setUser({});
      } catch (error) {}
    }
  }, [user]);

  const onPressType = useCallback(
    v => {
      if (v !== type.type) {
        setType(v);
      }
    },
    [type],
  );

  const onChangeId = useCallback(v => {
    setId(v);
  }, []);

  const onChangePassword = useCallback(v => {
    setPassword(v);
  }, []);

  const onPressLogin = useCallback(async () => {
    try {
      const response = await axios.post('http://172.30.1.27:3005/api/login', {
        id,
        password,
        type,
      });

      let jsonValue = {};
      jsonValue['id'] = id;
      jsonValue['type'] = type;
      response.headers['set-cookie'][0].split('; ').map(v => {
        if (v.split('=')[0] === 'token') {
          jsonValue['token'] = v.split('=')[1];
        }
      });

      try {
        await AsyncStorage.setItem('user', JSON.stringify(jsonValue));
        setUser(jsonValue);
        toggleModal();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      console.log('abc');
    }
  }, [type, id, password]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>마이페이지</Text>
      </View>
      <TouchableOpacity style={styles.line} onPress={logInOut}>
        <Text>{Object.keys(user).length === 0 ? '로그인' : '로그아웃'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.line}>
        <Text>구매내역</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.line}>
        <Text>예약확인</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text>로그인</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>끄기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.types}>
            <TouchableOpacity
              style={[
                styles.type,
                {
                  backgroundColor: type === 1 ? 'gray' : null,
                },
              ]}
              onPress={() => onPressType(1)}>
              <Text>사용자</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.type,
                {
                  backgroundColor: type === 2 ? 'gray' : null,
                },
              ]}
              onPress={() => onPressType(2)}>
              <Text>판매자</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>아이디</Text>
          </View>
          <TextInput value={id} onChangeText={onChangeId} />
          <View>
            <Text>비밀번호</Text>
          </View>
          <TextInput value={password} onChangeText={onChangePassword} />
          <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
            <Text>로그인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Main;
