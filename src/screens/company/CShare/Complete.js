import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text, VStack, Badge, HStack} from 'native-base';
import dayjs from 'dayjs';
import {toDecimalString} from '@utils';

export const Complete = ({data}) => {
  const {
    category,
    price,
    time,
    personnel,
    description,
    description_company,
    address,
    address_detail,
    phone,
    status,
    completedAt,
    updatedAt,
  } = data;

  const dateStr =
    status === 0
      ? dayjs(updatedAt).format('YY. MM. DD')
      : dayjs(completedAt).format('YY. MM. DD');

  const statusStr = status === 0 ? '취소' : '완료';

  return (
    <SafeAreaView flex={1}>
      <VStack
        p={5}
        space={10}
        borderWidth={1}
        borderColor="gray.600"
        m={5}
        rounded="sm">
        <HStack justifyContent="space-between">
          <Badge alignSelf="flex-start" variant="outline">
            {statusStr}
          </Badge>
          <Text fontSize="xs">{dateStr}</Text>
        </HStack>
        <Text
          textAlign="center"
          fontSize="xl">{`${category} · ${time}분 · ${personnel}인 · ${toDecimalString(
          price,
        )}원`}</Text>
        <VStack space={5} rounded="sm" borderColor="gray.300">
          <VStack space={1}>
            <Text color="gray.600">연락처</Text>
            <Text fontSize="md">{phone}</Text>
          </VStack>
          <VStack space={1}>
            <Text color="gray.600">주소</Text>
            <VStack>
              <Text fontSize="md">{`${address}`}</Text>
              {!!address_detail && (
                <Text fontSize="md">{`${address_detail}`}</Text>
              )}
            </VStack>
          </VStack>
          {!!description && (
            <VStack space={1}>
              <Text color="gray.600">요청 메세지</Text>
              <Text fontSize="md">{description}</Text>
            </VStack>
          )}
          {!!description_company && (
            <VStack space={1}>
              <Text color="gray.600">업체 메세지</Text>
              <Text fontSize="md">{description_company}</Text>
            </VStack>
          )}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
