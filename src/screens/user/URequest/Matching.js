import React from 'react';
import {SafeAreaView} from 'react-native';
import {VStack, Button, Heading, Text, Spinner, HStack} from 'native-base';

export const Matching = () => {
  return (
    <SafeAreaView flex={1}>
      <HStack p={10} space={1} alignItems="center">
        <Heading>인근 업체 매칭 중</Heading>
        <Spinner />
      </HStack>
      <VStack flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="2xl">타이 · 90분 · 2명</Text>
      </VStack>
      <VStack m={10} space={3}>
        <Text alignSelf="center">
          고의적으로 취소 반복 시 이용이 정지 될 수 있습니다
        </Text>
        <Button>취소하기</Button>
      </VStack>
    </SafeAreaView>
  );
};
