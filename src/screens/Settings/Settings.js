import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '#redux/features/token/tokenSlice';

export const Settings = ({navigation}) => {
  const token = useSelector(state => state.token.value);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        // try {
        //   const keys = await AsyncStorage.getAllKeys();
        //   await AsyncStorage.clear();
        //   console.log(keys);
        //   const jsonValue = await AsyncStorage.getItem('token');
        //   console.log(jsonValue);
        // } catch (error) {}
        console.log(token);
      };
      getData();
    }, [token]),
  );

  const handlePressSignout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(setToken(''));
    } catch (error) {}
  }, []);

  return (
    <View>
      <View>
        <Text>경험치 내역</Text>
      </View>
      <View>
        {!token && (
          <Pressable onPress={() => navigation.navigate('Sign')}>
            <Text>로그인 / 회원가입</Text>
          </Pressable>
        )}
      </View>
      <View>
        <Pressable onPress={handlePressSignout}>
          <Text>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
};
