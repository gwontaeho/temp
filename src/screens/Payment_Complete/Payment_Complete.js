import React, {useState} from 'react';
import {Button, Text, VStack, Center, Avatar} from 'native-base';

export const Payment_Complete = ({navigation}) => {
  return (
    <Center flex={1} bg="#fff" p={5}>
      <VStack space={5} flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="2xl" bold>
          결제완료
        </Text>
        <Text>펀딩 결제가 완료되었습니다!</Text>
        <Center bg="#eee" p={5} borderRadius={10}>
          <Text>nn일 전까지는 신청취소가 가능하며</Text>
          <Text>nn일 이후로는 수수료가 발생합니다.</Text>
        </Center>
        <Avatar size={200} />
      </VStack>
      <Button width="full" mb={5}>
        내 거래내역 보기
      </Button>
      <Button width="full" onPress={() => navigation.navigate('Tabs')}>
        메인으로
      </Button>
    </Center>
  );
};
