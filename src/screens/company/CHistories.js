import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Heading,
  FlatList,
  View,
  Divider,
  HStack,
  Text,
} from 'native-base';
import {useQuery, useMutation} from '@tanstack/react-query';
import {getHistories, deleteHistories1} from '@apis';
import {AuthContext} from '@contexts';
import {HistoryCard} from '@components/company';

export const CHistories = () => {
  const {auth} = useContext(AuthContext);

  const [selected, setSelected] = useState([]);

  const {data, refetch} = useQuery({
    queryKey: ['CHistories'],
    queryFn: () => getHistories(auth.id),
    enabled: !!auth.id,
  });

  const {mutate} = useMutation({
    mutationFn: () => deleteHistories1({ids: selected}),
    onSettled: () => {
      setSelected([]);
      refetch();
    },
  });

  const handlePressSelectAll = () => {
    if (selected.length > 0) setSelected([]);
    else
      setSelected(
        data.filter(v => v.status === 4 || v.status === 5).map(v => v.id),
      );
  };

  const handlePressDelete = () => {
    if (selected.length > 0) mutate();
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        px={5}
        height={100}
        alignItems="center"
        justifyContent="space-between">
        <Heading>매칭 리스트</Heading>
        <Button size="sm" onPress={refetch}>
          새로고침
        </Button>
      </HStack>
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
      <Text textAlign="center" my={3}>
        앱을 닫으셔도 고객이 수락시 알려드립니다{`\n`}바로 확인하시려면
        새로고침을 눌러주세요
      </Text>
      <Divider />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <HistoryCard
            item={item}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View p={2.5} />}
        _contentContainerStyle={{p: 5}}
      />
    </SafeAreaView>
  );
};
