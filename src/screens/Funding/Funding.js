import React from 'react';

import {
  Text,
  Flex,
  ScrollView,
  Center,
  VStack,
  HStack,
  Image,
  Pressable,
  Fab,
  Button,
} from 'native-base';

export const Funding = ({navigation}) => {
  return (
    <Flex flex={1}>
      <ScrollView flex={1} bg="#fff">
        <Center py={5}>
          <Text fontSize="lg" bold>
            펀딩제목
          </Text>
          <Text>작가</Text>
        </Center>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          w="full"
          aspectRatio={4 / 3}
          alt="11"
        />
        <VStack p={5} space={2}>
          <HStack>
            <Text w={20}>작가명</Text>
            <Text bold>채정선</Text>
          </HStack>
          <HStack>
            <Text w={20}>모집마감</Text>
            <Text bold>2022년 5월 20일</Text>
          </HStack>
          <HStack>
            <Text w={20}>목표금액</Text>
            <Text bold>300,000,000원</Text>
          </HStack>
          <HStack>
            <Text w={20}>모집비용</Text>
            <Text bold>195,000,000 원</Text>
          </HStack>
          <Text pl={20}>154명 참여중</Text>
        </VStack>
        <Pressable onPress={() => navigation.navigate('Artist')}>
          <Text>to Artist</Text>
        </Pressable>
      </ScrollView>
      <Flex position="absolute" bottom={0} width="full" p={5}>
        <Button onPress={() => navigation.navigate('Payment')}>
          to payment
        </Button>
      </Flex>
    </Flex>
  );
};
