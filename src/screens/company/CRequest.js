import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Text, VStack, HStack, Badge} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {acceptRequestByCompany} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormInput} from '@components';

export const CRequest = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const {auth} = useContext(AuthContext);

  const {params = {}} = route;
  const {
    id,
    category,
    price,
    time,
    personnel,
    description,
    address,
    address_detail,
    distance,
    share,
  } = params;
  const d = (distance / 1000).toFixed(1);

  const badgeStr = share ? '업체 공유' : '사용자 요청';
  const borderColor = share ? 'secondary.600' : 'primary.600';
  const colorScheme = share ? 'secondary' : 'primary';

  const [description_company, setDescription_company] = useState('');

  const {mutate} = useMutation({
    mutationFn: () =>
      acceptRequestByCompany({
        id,
        TargetId: auth.id,
        description_company,
        distance: d,
      }),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['CHistories']}),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['CRequests']});
      queryClient.invalidateQueries({queryKey: ['CCount']});
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
        <Badge
          alignSelf="flex-start"
          variant="outline"
          colorScheme={colorScheme}>
          {badgeStr}
        </Badge>
        <Text
          textAlign="center"
          fontSize="xl">{`${category} · ${time}분 · ${personnel}인 · ${price}원`}</Text>
        <VStack space={5} rounded="sm" borderColor="gray.300">
          <VStack space={1}>
            <HStack justifyContent="space-between">
              <Text color="gray.600">주소</Text>
              <Text color="gray.600" fontSize="xs">{`${d}km`}</Text>
            </HStack>
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
        </VStack>
        <ModalFormInput
          label="업체 메세지"
          value={description_company}
          onComplete={v => setDescription_company(v)}
        />
        <Button onPress={mutate}>수락하기</Button>
      </VStack>
    </SafeAreaView>
  );
};
