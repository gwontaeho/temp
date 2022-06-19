import React, {useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Settings = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user');
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log(jsonValue);
        } catch (error) {
          // error reading value
        }
      };
      getData();
    }, []),
  );

  return (
    <View>
      <View>
        <Text>경험치 내역</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
          <Text>로그인 / 회원가입</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>로그아웃</Text>
      </View>
    </View>
  );
};
