import React, {useState} from 'react';
import {Input, Divider, Button, VStack, Flex, View, Text} from 'native-base';

export const Payment = ({navigation}) => {
  return (
    <VStack space={5} flex={1}>
      <VStack p={5} space={5} bg="#fff">
        <Text>잔여수량</Text>
        <View p={5} bg="#eee" borderRadius={10}>
          <Text>총 300,000,000원 중</Text>
          <Text fontSize="xl" bold mb={5}>
            100,000,000원
          </Text>
          <Text>1인당 구매 가능 수량 100개</Text>
          <Text>후원권 개당 가격 10,000원</Text>
        </View>
      </VStack>
      <VStack space={5} flex={1} bg="#fff" p={5}>
        <Flex direction="row" justify="space-between">
          <View>
            <Text>구매수량</Text>
            <Text>최대 100개</Text>
          </View>
          <Input w={100} placeholder="최소 1개" />
        </Flex>
        <Flex direction="row" justify="space-between">
          <Text>개당가격</Text>
          <Text>10,000원</Text>
        </Flex>
        <Divider />
        <Flex align="flex-end">
          <Text fontSize="2xl" bold>
            총 0원
          </Text>
        </Flex>
      </VStack>
      <Button onPress={() => navigation.navigate('Payment_Check')}>다음</Button>
    </VStack>
  );
};
