import React from 'react';
import {
  Button,
  Select,
  Input,
  useDisclose,
  Flex,
  Text,
  Divider,
  HStack,
} from 'native-base';

import {Pin} from '#components/modals/Pin';

export const Deposit_Account = ({navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Flex flex={1}>
      <Flex p={5} bg="#fff" mb={5}>
        <Text bold mb={5}>
          계좌정보
        </Text>
        {/* <Flex p={5} bg="#eee" h={200} justify="space-around" borderRadius={10}>
          <HStack space={1}>
            <Text bold>예금주</Text>
            <Text>누아트</Text>
          </HStack>
          <Select size="2xl"></Select>
          <Input size="2xl" />
        </Flex> */}
        <Flex p={5} bg="#eee" h={200} justify="space-around" borderRadius={10}>
          <Text bold fontSize="md">
            신한은행
          </Text>
          <Text>152853123212</Text>
          <Divider />
          <HStack space={1}>
            <Text bold>예금주</Text>
            <Text>비홀드 홍길동</Text>
          </HStack>
          <HStack space={1}>
            <Text bold>생성일</Text>
            <Text>2022년 6월 1일</Text>
          </HStack>
        </Flex>
      </Flex>
      <Flex flex={1} bg="#fff" p={5}>
        <Text bold mb={5}>
          주의사항
        </Text>
        <Text>주의사항1</Text>
        <Text>주의사항2</Text>
        <Text>주의사항3</Text>
        <Text>주의사항4</Text>
      </Flex>
      <Button onPress={onOpen}>확인</Button>
      <Pin onComplete={onClose} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
