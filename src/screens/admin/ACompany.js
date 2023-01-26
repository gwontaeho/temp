import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Input,
  FormControl,
  ScrollView,
} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {blockUser, restoreUser, updateExpiration} from '@apis';

export const ACompany = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const {params = {}} = route;
  const {id, status, Company, phone} = params;
  const {name} = Company;

  const today = dayjs(dayjs().format('YYYYMMDD'));

  const diff = Company.expiration
    ? dayjs(Company.expiration).diff(today) / 1000 / 60 / 60 / 24
    : -1;

  const color =
    status === 0 ? 'danger.600' : diff < 0 ? 'gray.600' : 'success.600';

  const statusStr =
    status === 0
      ? '이용이 정지된 업체입니다'
      : diff < 0
      ? '이용기간이 만료된 업체입니다'
      : `${diff}일 남았습니다`;

  const [expiration, setExpiration] = useState('');

  const {mutate: updateMutation} = useMutation({
    mutationFn: () => updateExpiration({id: Company.id, expiration}),
    onSuccess: () => {
      navigation.setParams({...params, Company: {...Company, expiration}});
      queryClient.invalidateQueries({queryKey: ['companies']});
    },
  });

  const {mutate: blockMutate} = useMutation({
    mutationFn: () => blockUser({id}),
    onSuccess: () => {
      navigation.setParams({...params, status: 0});
      queryClient.invalidateQueries({queryKey: ['companies']});
    },
  });

  const {mutate: restoreMutate} = useMutation({
    mutationFn: () => restoreUser({id}),
    onSuccess: () => {
      navigation.setParams({...params, status: 1});
      queryClient.invalidateQueries({queryKey: ['companies']});
    },
  });

  const handleChange = v => {
    const numReg = /^[0-9]*$/;
    if (numReg.test(v)) return setExpiration(v);
  };

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VStack p={5} space={10} flex={1}>
          <VStack
            p={3}
            rounded="sm"
            borderColor={color}
            space={3}
            borderWidth={1}>
            <VStack space={1}>
              <Text color={color} bold alignSelf="flex-end">
                {statusStr}
              </Text>
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
                  {Company.expiration
                    ? dayjs(Company.expiration).format('YYYY. MM. DD')
                    : '-'}
                </Text>
              </HStack>
            </VStack>
          </VStack>
          <FormControl>
            <FormControl.Label>만료일 설정</FormControl.Label>
            <Input
              h={10}
              size="md"
              maxLength={8}
              value={expiration}
              onChangeText={handleChange}
              InputRightElement={
                <Button
                  size="sm"
                  rounded="none"
                  h="full"
                  onPress={updateMutation}>
                  확인
                </Button>
              }
            />
            <FormControl.HelperText>ex) 20230509</FormControl.HelperText>
          </FormControl>
          <Divider />
          <Button
            size="sm"
            variant="outline"
            onPress={status === 1 ? blockMutate : restoreMutate}>
            {status === 1 ? '정지' : '복구'}
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
