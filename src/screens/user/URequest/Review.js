import React from 'react';
import {SafeAreaView} from 'react-native';
import {VStack, Button, Heading, Text} from 'native-base';

export const Review = () => {
  return (
    <SafeAreaView flex={1}>
      <Heading p={10}>업체 평가하기</Heading>
      <VStack flex={1} alignItems="center" justifyContent="center"></VStack>
      <VStack m={10} space={3}>
        <Button>이 업체 또 만나기</Button>
        <Button>만나지 않기</Button>
      </VStack>
    </SafeAreaView>
  );
};
