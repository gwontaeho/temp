import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Heading,
  HStack,
  FlatList,
  View,
  Divider,
  Badge,
} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {getShares} from '@apis';
import {AuthContext} from '@contexts';

export const CShares = ({navigation}) => {
  const {auth} = useContext(AuthContext);

  const {data, refetch} = useQuery({
    queryKey: ['CShares'],
    queryFn: () => getShares(auth.id),
  });

  const renderItem = ({item}) => {
    const {id, category, price, personnel, time, status} = item;

    const statusStr =
      status === 1
        ? '인근 업체에 요청 중'
        : status === 2
        ? '수락 대기 중'
        : status === 3
        ? '업체 이동 중'
        : '완료';

    const borderColor =
      status === 1
        ? 'info.600'
        : status === 2
        ? 'warning.600'
        : status === 3
        ? 'success.600'
        : 'gray.600';

    const colorScheme =
      status === 1
        ? 'info'
        : status === 2
        ? 'warning'
        : status === 3
        ? 'success'
        : 'gray';

    return (
      <VStack
        p={3}
        rounded="sm"
        borderColor={borderColor}
        borderWidth={1}
        space={1}>
        <HStack alignItems="center" justifyContent="space-between">
          <Badge
            alignSelf="flex-start"
            variant="outline"
            colorScheme={colorScheme}>
            {statusStr}
          </Badge>
          {status === 4 && <Text fontSize="xs">* 후기를 작성해주세요</Text>}
        </HStack>
        <HStack alignItems="center" justifyContent="space-between">
          <Text>{`${category} · ${time}분 · ${personnel}인`}</Text>
          <Button size="sm" onPress={() => navigation.navigate('CShare', id)}>
            자세히
          </Button>
        </HStack>
      </VStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        height={120}
        px={10}
        alignItems="center"
        justifyContent="space-between">
        <Heading>콜 공유</Heading>

        <Button.Group isAttached size="sm">
          <Button onPress={refetch}>새로고침</Button>
          <Button onPress={() => navigation.navigate('CShareCreate')}>
            공유하기
          </Button>
        </Button.Group>
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
