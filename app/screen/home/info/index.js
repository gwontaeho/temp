import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from 'react-native-paper';
import axios from '../../../axios';

import styles from './styles';

const Info = props => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [reservationCountData, setReservationCountData] = useState({});

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
        setToken(JSON.parse(jsonValue).token);
        requestUserData(JSON.parse(jsonValue).token);
        requestReservationCountData(JSON.parse(jsonValue).token);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestUserData = useCallback(async v => {
    try {
      const response = await axios.get('/api/auth/user', {
        headers: {token: v},
      });
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestReservationCountData = useCallback(async v => {
    try {
      const response = await axios.get('/api/reservation/count', {
        headers: {token: v},
      });
      setReservationCountData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logIn = useCallback(() => {
    props.navigation.navigate('Login');
  }, []);

  const logOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('jsonValue');
      setUserData({});
      setReservationCountData({});
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  const onPressHistory = useCallback(() => {
    props.navigation.navigate('History', {token});
  }, [userData]);

  const onPressQna = useCallback(() => {
    props.navigation.navigate('Qna', {token});
  }, [userData]);

  const onPressReview = useCallback(() => {
    props.navigation.navigate('Review', {token});
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>마이페이지</Text>
      </View>
      <Divider />
      <ScrollView>
        <View style={styles.info}>
          {Object.keys(userData).length === 0 ? (
            <TouchableOpacity style={styles.info_sign} onPress={logIn}>
              <Text>로그인 ></Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.info_sign}>
              <Text>{userData.id}</Text>
            </View>
          )}

          <View style={styles.info_image_container}>
            {Object.keys(userData).length === 0 ? null : (
              <Image
                source={{
                  uri:
                    'http://172.30.1.27:3005' +
                    userData.img.replace(/\\/gi, '/').replace(/public/gi, ''),
                }}
                style={styles.info_image}
              />
            )}
          </View>
        </View>

        {Object.keys(userData).length === 0 ? null : (
          <>
            <TouchableOpacity style={styles.title} onPress={onPressHistory}>
              <Text style={styles.title_text}>예약 내역 ></Text>
            </TouchableOpacity>
            <View style={styles.history}>
              <View style={styles.history_item}>
                <Text style={styles.text}>예약 대기</Text>
                <Text style={styles.text}>{reservationCountData.e}</Text>
              </View>
              <View style={styles.history_item}>
                <Text style={styles.text}>예약 중</Text>
                <Text style={styles.text}>{reservationCountData.a}</Text>
              </View>
              <View style={styles.history_item}>
                <Text style={styles.text}>수강 완료</Text>
                <Text style={styles.text}>
                  {reservationCountData.b + reservationCountData.f}
                </Text>
              </View>
              <View style={styles.history_item}>
                <Text style={styles.text}>취소 요청</Text>
                <Text style={styles.text}>{reservationCountData.c}</Text>
              </View>
              <View style={styles.history_item}>
                <Text style={styles.text}>취소</Text>
                <Text style={styles.text}>{reservationCountData.d}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.title} onPress={onPressQna}>
              <Text style={styles.title_text}>문의 내역 ></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.title} onPress={onPressReview}>
              <Text style={styles.title_text}>후기 내역 ></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.title} onPress={logOut}>
              <Text style={styles.title_text}>로그아웃 ></Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Info;
