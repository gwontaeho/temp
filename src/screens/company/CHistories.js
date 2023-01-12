import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Heading,
  FlatList,
  View,
  Divider,
  HStack,
  Badge,
} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {getHistories} from '@apis';
import {AuthContext} from '@contexts';

export const CHistories = ({navigation}) => {
  const {auth} = useContext(AuthContext);

  const {data, refetch} = useQuery({
    queryKey: ['CHistories'],
    queryFn: () => getHistories(auth.id),
    enabled: !!auth.id,
  });

  const renderItem = ({item}) => {
    const {category, personnel, time, status, share} = item;

    const shareStr = share ? '업체' : '사용자';
    const shareColorScheme = share ? 'secondary' : 'primary';

    const statusStr =
      status === 2 ? '대기 중' : status === 3 ? '진행 중' : '완료';
    const borderColor =
      status === 2 ? 'info.600' : status === 3 ? 'success.600' : 'gray.600';
    const colorScheme =
      status === 2 ? 'info' : status === 3 ? 'success' : 'gray';

    return (
      <VStack
        p={3}
        rounded="sm"
        borderColor={borderColor}
        borderWidth={1}
        space={1}>
        <HStack space={1}>
          <Badge
            alignSelf="flex-start"
            variant="outline"
            colorScheme={shareColorScheme}>
            {shareStr}
          </Badge>
          <Badge
            alignSelf="flex-start"
            variant="outline"
            colorScheme={colorScheme}>
            {statusStr}
          </Badge>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between">
          <Text>{`${category} · ${time}분 · ${personnel}인`}</Text>
          <Button
            size="sm"
            onPress={() => navigation.navigate('CHistory', item)}>
            자세히
          </Button>
        </HStack>
      </VStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        px={10}
        height={120}
        alignItems="center"
        justifyContent="space-between">
        <Heading>매칭 리스트</Heading>
        <Button size="sm" onPress={refetch}>
          새로고침
        </Button>
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
