import React, {useReducer, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {VStack, Button, ScrollView, Text, HStack} from 'native-base';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';

import {createRequest, getAveragePrices} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormAddress, ModalFormCShare} from '@components';

const initialState = {
  longitude: 0,
  latitude: 0,
  category: '타이',
  time: 60,
  price: '',
  description: '',
  personnel: 1,
  address: '',
  phone: '',
  address_detail: '',
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'setPersonnel':
      return {...state, personnel: payload};
    case 'setCategory':
      return {...state, category: payload};
    case 'setTime':
      return {...state, time: payload};
    case 'setAddress':
      return {...state, ...payload};
    case 'setDetail':
      return {...state, ...payload};
  }
};

export const CShareCreate = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const personnels = [1, 2, 3, 4];
  const categories = ['타이', '아로마', '스웨디시', '스페셜'];
  const times = [60, 90, 120, 150];

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    personnel,
    category,
    time,
    address,
    price,
    latitude,
    longitude,
    description,
    address_detail,
    phone,
  } = state;

  const {data} = useQuery({
    queryKey: ['AveragePrices'],
    queryFn: getAveragePrices,
  });

  const {mutate} = useMutation({
    mutationFn: variables => createRequest(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['CShares']});
      navigation.goBack();
    },
  });

  const average_price = Math.ceil(
    data?.find(v => v.category === category)?.[`avg_price_${time}`] || 0,
  );

  const handlePressSubmit = () => {
    if ((!price && !average_price) || !latitude || !longitude) return;
    mutate({
      ...state,
      UserId: auth.id,
      share: true,
      price: price || average_price,
    });
  };

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VStack flex={1} p={5} space={10}>
          <VStack space={3} alignItems="flex-end">
            <HStack>
              <ModalFormAddress
                label="위치 입력"
                onComplete={v => dispatch(v)}
              />
            </HStack>
            <Text color="gray.600" bold>
              {address || '위치를 입력해주세요'}
            </Text>
          </VStack>

          <VStack space={3}>
            <Button.Group isAttached w="full" size="sm">
              {personnels.map(v => {
                const selected = personnel === v;
                return (
                  <Button
                    key={v}
                    variant={selected ? 'solid' : 'outline'}
                    onPress={() => dispatch({type: 'setPersonnel', payload: v})}
                    w={`${100 / personnels.length}%`}>
                    {`${v} 명`}
                  </Button>
                );
              })}
            </Button.Group>
            <Button.Group isAttached w="full" size="sm">
              {categories.map(v => {
                const selected = category === v;
                return (
                  <Button
                    key={v}
                    variant={selected ? 'solid' : 'outline'}
                    onPress={() => dispatch({type: 'setCategory', payload: v})}
                    w={`${100 / categories.length}%`}>
                    {v}
                  </Button>
                );
              })}
            </Button.Group>
            <Button.Group isAttached w="full" size="sm">
              {times.map(v => {
                const selected = time === v;
                return (
                  <Button
                    key={v}
                    variant={selected ? 'solid' : 'outline'}
                    onPress={() => dispatch({type: 'setTime', payload: v})}
                    w={`${100 / times.length}%`}>
                    {`${v}분`}
                  </Button>
                );
              })}
            </Button.Group>
          </VStack>

          <ModalFormCShare
            values={{price, phone, description, address_detail, average_price}}
            onComplete={v => dispatch({type: 'setDetail', payload: v})}
          />

          <Button
            onPress={handlePressSubmit}
            isDisabled={
              (!price && !average_price) || !latitude || !longitude || !phone
            }>
            요청하기
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
