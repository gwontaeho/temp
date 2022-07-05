import React, {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native';
import {Avatar, VStack, Divider, Text, Flex, ScrollView} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';

export const Settings = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView _contentContainerStyle={{p: 7}}>
        <Flex justify="center" mb={7}>
          <Text bold onPress={() => navigation.navigate('Login')}>
            이름
          </Text>
          <Text onPress={() => navigation.navigate('Signup')}>이메일</Text>
        </Flex>

        <Text fontSize="xs" mb={5}>
          나의 예치금
        </Text>
        <Flex
          p={3}
          mb={7}
          bg="#eee"
          direction="row"
          justify="space-between"
          align="center">
          <Text bold>0원</Text>
          <Text fontSize="xs">충전하기</Text>
        </Flex>

        <VStack space={5}>
          <Text fontSize="xs">비홀드 서비스</Text>
          <Text>작가투자</Text>
          <Text>스토리</Text>
          <Divider />
          <Text fontSize="xs">비홀드 플러스</Text>
          <Text>나의 작가 리스트</Text>
          <Text onPress={() => navigation.navigate('Funding_History')}>
            나의 투자 현황
          </Text>
          <Divider />
          <Text fontSize="xs">관리</Text>
          <Text onPress={() => navigation.navigate('Deposit')}>
            예치금 관리
          </Text>
          <Text onPress={() => navigation.navigate('Deposit_Account')}>
            출금계좌 관리
          </Text>
          <Divider />
          <Text fontSize="xs">고객센터</Text>
          <Text>이용 가이드</Text>
          <Text>자주 하는 질문</Text>
          <Text>고객센터</Text>
          <Text>약관 및 정책</Text>
          <Text>앱 설정</Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
