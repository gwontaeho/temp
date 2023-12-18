import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Heading,
  View,
  FlatList,
} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {getCompanies} from '@apis';

export const ACompanies = ({navigation}) => {
  const {data} = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });

  const renderItem = ({item}) => {
    const {phone, Company, status} = item;
    const {name, expiration} = Company;

    const today = dayjs(dayjs().format('YYYYMMDD'));
    const diff = expiration
      ? dayjs(expiration).diff(today) / 1000 / 60 / 60 / 24
      : -1;

    const borderColor =
      status === 0 ? 'danger.600' : diff < 0 ? 'gray.600' : 'success.600';

    return (
      <VStack
        p={3}
        rounded="sm"
        borderColor={borderColor}
        space={3}
        borderWidth={1}>
        <VStack space={1}>
          <HStack space={3}>
            <Text color="gray.600">업체명</Text>
            <Text bold>{name || '-'}</Text>
          </HStack>
          <HStack space={3}>
            <Text color="gray.600">연락처</Text>
            <Text bold>{phone}</Text>
          </HStack>
          <HStack space={3}>
            <Text color="gray.600">만료일</Text>
            <Text bold>
              {expiration ? dayjs(expiration).format('YYYY. MM. DD') : '-'}
            </Text>
          </HStack>
        </VStack>
        <Divider />
        <Button
          size="sm"
          flex={1}
          variant="outline"
          onPress={() => navigation.navigate('ACompany', item)}>
          자세히
        </Button>
      </VStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <HStack p={5} space={5}>
        <HStack alignItems="center" space={1}>
          <View bgColor="success.600" w={3} h={3} rounded="full" />
          <Text>활성</Text>
        </HStack>
        <HStack alignItems="center" space={1}>
          <View bgColor="gray.600" w={3} h={3} rounded="full" />
          <Text>만료</Text>
        </HStack>
        <HStack alignItems="center" space={1}>
          <View bgColor="red.600" w={3} h={3} rounded="full" />
          <Text>정지</Text>
        </HStack>
      </HStack>
      <Divider />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View p={2.5} />}
        _contentContainerStyle={{p: 5}}
      />
    </SafeAreaView>
  );
};
