import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  Heading,
  HStack,
  FlatList,
  View,
  Divider,
} from 'native-base';
import dayjs from 'dayjs';
import {useQuery, useMutation} from '@tanstack/react-query';
import {getShares, deleteHistories3} from '@apis';
import {AuthContext} from '@contexts';
import {ShareCard} from '@components/company';

export const CShares = ({navigation}) => {
  const {auth} = useContext(AuthContext);

  const [selected, setSelected] = useState([]);

  const {Company} = auth;
  const {expiration, max_count} = Company || {};

  const today = dayjs(auth.date).format('YYYYMMDD');
  const diff = expiration
    ? dayjs(expiration).diff(today) / 1000 / 60 / 60 / 24
    : -1;

  const expired = diff < 0;

  const expirationStr = expired
    ? '만료일이 경과했습니다'
    : dayjs(expiration).format('YY. MM. DD 까지 사용 가능');

  const {data, refetch} = useQuery({
    queryKey: ['CShares'],
    queryFn: () => getShares(auth.id),
    enabled: !expired,
  });

  const {mutate} = useMutation({
    mutationFn: () => deleteHistories3({ids: selected}),
    onSettled: () => {
      setSelected([]);
      refetch();
    },
  });

  const requests = data?.requests || [];
  const count = data?.count || 0;

  const handlePressSelectAll = () => {
    if (selected.length > 0) setSelected([]);
    else
      setSelected(
        requests
          .filter(v => v.status === 4 || v.status === 5 || v.status === 0)
          .map(v => v.id),
      );
  };

  const handlePressDelete = () => {
    mutate();
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        height={100}
        px={5}
        alignItems="center"
        justifyContent="space-between">
        <Heading>콜 공유</Heading>

        <Button.Group isAttached size="sm">
          <Button onPress={refetch} isDisabled={expired}>
            새로고침
          </Button>
          <Button
            onPress={() => navigation.navigate('CShareCreate')}
            isDisabled={expired || count >= max_count}>
            공유하기
          </Button>
        </Button.Group>
      </HStack>
      <Text px={5} pb={5} alignSelf="flex-end" underline>
        {expirationStr}
      </Text>
      <Divider />
      <HStack mx={5} my={3} alignItems="center" justifyContent="flex-end">
        <Button.Group size="sm">
          <Button
            onPress={handlePressSelectAll}
            variant={selected.length > 0 ? 'outline' : 'solid'}
            borderWidth={1}
            borderColor="primary.600">
            완료된 매칭 전체선택
          </Button>
          <Button
            onPress={handlePressDelete}
            borderWidth={1}
            borderColor="primary.600">
            선택된 항목 삭제
          </Button>
        </Button.Group>
      </HStack>

      <Divider />
      {!expired && (
        <FlatList
          data={requests}
          renderItem={({item}) => (
            <ShareCard
              item={item}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={<View p={2.5} />}
          _contentContainerStyle={{p: 5}}
        />
      )}
    </SafeAreaView>
  );
};
