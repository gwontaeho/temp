import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  HStack,
  Divider,
  Heading,
  View,
  FlatList,
} from 'native-base';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getInquiries, acceptInquiry, rejectInquiry} from '@apis';

export const AInquiries = ({navigation}) => {
  const queryClient = useQueryClient();

  const {data, refetch} = useQuery({
    queryKey: ['inquiries'],
    queryFn: getInquiries,
    onSuccess: () => console.log('asd'),
  });

  const {mutate: acceptMutate} = useMutation({
    mutationFn: variables => acceptInquiry(variables),
    onSettled: refetch,
    onSuccess: async () =>
      await queryClient.invalidateQueries({queryKey: ['dashboard']}),
  });

  const {mutate: rejectMutate} = useMutation({
    mutationFn: variables => rejectInquiry(variables),
    onSettled: refetch,
    onSuccess: async () =>
      await queryClient.invalidateQueries({queryKey: ['dashboard']}),
  });

  const renderItem = ({item}) => {
    const {id, phone, company_name} = item;

    const handlePressAccept = () => {
      acceptMutate({id, company_name});
    };

    const handlePressReject = () => {
      rejectMutate({id});
    };

    return (
      <HStack
        p={5}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        borderColor="gray.300"
        borderWidth={1}>
        <Text fontSize="md">{phone}</Text>
        <Button.Group isAttached size="sm">
          <Button variant="outline" onPress={handlePressReject}>
            거부
          </Button>
          <Button onPress={handlePressAccept}>승인</Button>
        </Button.Group>
      </HStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
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
