import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  HStack,
  Flex,
  Text,
  FlatList,
  ScrollView,
  VStack,
} from 'native-base';

export const Deposit = ({navigation}) => {
  const data = [
    {
      id: 1,
      text: '1',
    },
    {
      id: 2,
      text: '2',
    },
    {
      id: 3,
      text: '3',
    },
    {
      id: 4,
      text: '3',
    },
    {
      id: 5,
      text: '3',
    },
    {
      id: 6,
      text: '3',
    },
    {
      id: 7,
      text: '3',
    },
  ];

  const renderItem = ({item}) => {
    const {id, text} = item;

    return (
      <VStack p={2} space={2}>
        <Flex direction="row" justify="space-between">
          <Text bold>예치금 충전</Text>
          <Text>+500,000원</Text>
        </Flex>
        <Flex direction="row" justify="space-between">
          <Text>18:00</Text>
          <Text>1,800,000</Text>
        </Flex>
      </VStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <Flex bg="#fff" p={5} mb={5}>
        <Flex bg="#eee" p={5} borderRadius={10}>
          <Text>예치금</Text>
          <Text fontSize="xl" bold mb={5}>
            1,500,000원
          </Text>
          <HStack space={5}>
            <Button
              onPress={() => navigation.navigate('Deposit_Account')}
              width={20}>
              출금
            </Button>
            <Button
              onPress={() => navigation.navigate('Deposit_Virtual')}
              flex={1}>
              충전
            </Button>
          </HStack>
        </Flex>
      </Flex>
      <Flex bg="#fff" flex={1}>
        <Text p={5} bold>
          내역보기
        </Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          _contentContainerStyle={{p: 5}}
        />
      </Flex>
    </SafeAreaView>
  );
};
