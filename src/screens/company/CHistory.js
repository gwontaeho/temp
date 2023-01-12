import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Text, VStack, Badge, HStack} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {completeRequestByCompany, cancelRequestByCompany} from '@apis';

export const CHistory = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const {params = {}} = route;
  const {
    id,
    category,
    price,
    time,
    personnel,
    description,
    description_company,
    address,
    address_detail,
    status,
    share,
    User,
  } = params;
  const {phone} = User;

  const shareStr = share ? '업체' : '사용자';
  const shareColorScheme = share ? 'secondary' : 'primary';

  const statusStr =
    status === 2 ? '대기 중' : status === 3 ? '진행 중' : '완료';
  const borderColor =
    status === 2 ? 'info.600' : status === 3 ? 'success.600' : 'gray.600';
  const colorScheme = status === 2 ? 'info' : status === 3 ? 'success' : 'gray';

  const {mutate: completeMutate} = useMutation({
    mutationFn: () => completeRequestByCompany(id),
    onSuccess: () => {
      navigation.setParams({...params, status: 4});
      queryClient.invalidateQueries({queryKey: ['CHistories']});
    },
  });

  const {mutate: cancelMutate} = useMutation({
    mutationFn: () => cancelRequestByCompany(id),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['CHistories']});
      queryClient.invalidateQueries({queryKey: ['CRequests']});
      navigation.goBack();
    },
  });

  return (
    <SafeAreaView flex={1}>
      <VStack
        p={5}
        space={10}
        borderWidth={1}
        borderColor={borderColor}
        m={5}
        rounded="sm">
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
        <Text
          textAlign="center"
          fontSize="xl">{`${category} · ${time}분 · ${personnel}인 · ${price}원`}</Text>
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
        {status === 3 && (
          <VStack space={3}>
            <Button onPress={cancelMutate}>취소</Button>
            <Button onPress={completeMutate}>완료</Button>
          </VStack>
        )}
      </VStack>
    </SafeAreaView>
  );
};
