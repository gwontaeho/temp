import React from 'react';
import {Avatar, VStack, Divider, Text, Flex, ScrollView} from 'native-base';

export const Settings = ({navigation}) => {
  return (
    <ScrollView _contentContainerStyle={{p: 7}}>
      <Flex mb={7} direction="row">
        <Avatar mr={5} />
        <Flex justify="center">
          <Text fontSize="md" bold onPress={() => navigation.navigate('Login')}>
            이름
          </Text>
          <Text fontSize="xs" onPress={() => navigation.navigate('Signup')}>
            이메일
          </Text>
        </Flex>
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
        <Text
          fontSize="xs"
          onPress={() => navigation.navigate('Certification')}>
          충전하기
        </Text>
      </Flex>
      <VStack space={5}>
        <Text fontSize="xs">비홀드 서비스</Text>
        <Text bold>펀딩 프로젝트</Text>
        <Text bold>마켓</Text>
        <Text bold>스토리</Text>
        <Divider />
        <Text fontSize="xs">비홀드 플러스</Text>
        <Text bold>나의 작가 리스트</Text>
        <Text bold onPress={() => navigation.navigate('Funding_History')}>
          나의 투자 현황
        </Text>
        <Divider />
        <Text fontSize="xs">관리</Text>
        <Text bold onPress={() => navigation.navigate('Deposit')}>
          예치금 관리
        </Text>
        <Text bold onPress={() => navigation.navigate('Deposit_Account')}>
          출금계좌 관리
        </Text>
        <Divider />
        <Text fontSize="xs">고객센터</Text>
        <Text bold>이용 가이드</Text>
        <Text bold>자주 하는 질문</Text>
        <Text bold>고객센터</Text>
        <Text bold>약관 및 정책</Text>
        <Text bold>앱 설정</Text>
      </VStack>
    </ScrollView>
  );
};
