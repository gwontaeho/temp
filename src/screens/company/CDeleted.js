import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, FlatList, View, Divider, HStack} from 'native-base';
import {useQuery, useMutation} from '@tanstack/react-query';
import {getDeleted, deleteHistories2} from '@apis';
import {AuthContext} from '@contexts';
import {HistoryCard} from '@components/company';

export const CDeleted = () => {
  const {auth} = useContext(AuthContext);

  const [selected, setSelected] = useState([]);

  const {data, refetch} = useQuery({
    queryKey: ['CDeleted'],
    queryFn: () => getDeleted({TargetId: auth.id, share: 'false'}),
    enabled: !!auth.id,
  });

  const {mutate} = useMutation({
    mutationFn: () => deleteHistories2({ids: selected}),
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
    mutate();
  };

  return (
    <SafeAreaView flex={1}>
      <HStack mx={5} my={3} alignItems="center" justifyContent="flex-end">
        <Button.Group size="sm">
          <Button
            onPress={handlePressSelectAll}
            variant={selected.length > 0 ? 'outline' : 'solid'}
            borderWidth={1}
            borderColor="primary.600">
            전체선택
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
