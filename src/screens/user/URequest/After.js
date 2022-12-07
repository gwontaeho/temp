import React from 'react';
import {SafeAreaView, Linking} from 'react-native';
import {VStack, Button, Heading, Text} from 'native-base';

export const After = () => {
  return (
    <SafeAreaView flex={1}>
      <Heading p={10}>업체 이동 중</Heading>
      <VStack flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="2xl">타이 · 90분 · 2명</Text>
      </VStack>
      <VStack m={10} space={3}>
        <Button>전화걸기</Button>
      </VStack>
    </SafeAreaView>
  );
};
