import React from 'react';
import {Button, Divider, Flex, Text, VStack, HStack} from 'native-base';

export const Deposit_Virtual = () => {
  return (
    <VStack flex={1} space={5}>
      <VStack p={5} bg="#fff" space={5}>
        <Text>계좌정보</Text>
        <Flex
          h={200}
          bg="#eee"
          p={5}
          align="center"
          justify="space-around"
          borderRadius={10}>
          <Text>아직 발급된 계좌가 없습니다</Text>
          <Text>예치금 입금을 위한 가상계좌가 발급되지 않았습니다.</Text>
          <Text>간단하게 계좌를 발급해보세요!</Text>
          <Button>가상계좌 발급하기</Button>
        </Flex>
        {/* <Flex h={200} bg="#eee" p={5} justify="space-around" borderRadius={10}>
          <Text>신한은행</Text>
          <Text>152853123212</Text>
          <Divider />
          <HStack space={1}>
            <Text>예금주</Text>
            <Text>비홀드 홍길동</Text>
          </HStack>
          <HStack space={1}>
            <Text>생성일</Text>
            <Text>2022년 6월 1일</Text>
          </HStack>
        </Flex> */}
      </VStack>
      <VStack space={5} bg="#fff" p={5} flex={1}>
        <Text>주의사항</Text>
        <Text>주의사항1</Text>
        <Text>주의사항2</Text>
        <Text>주의사항3</Text>
        <Text>주의사항4</Text>
      </VStack>
      <Button>확인</Button>
    </VStack>
  );
};
