import React, {useState, useEffect, useReducer, useContext} from 'react';
import {SafeAreaView, Platform, PermissionsAndroid} from 'react-native';
import {
  VStack,
  Button,
  Heading,
  ScrollView,
  Text,
  HStack,
  Divider,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';

import {useQuery, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {createRequest, getAveragePrices} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormAddress, ModalFormURequest} from '@components';

const initialState = {
  longitude: 0,
  latitude: 0,
  category: '타이',
  time: 60,
  price: 0,
  description: '',
  personnel: 1,
  address: '',
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
    case 'setPrice':
      return {...state, price: payload};
  }
};

export const Before = ({refetch}) => {
  const {auth} = useContext(AuthContext);

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
  } = state;
  const [errorMessage, setErrorMessage] = useState('');

  const {data} = useQuery({
    queryKey: ['AveragePrices'],
    queryFn: getAveragePrices,
  });

  const {mutate} = useMutation({
    mutationFn: variables => createRequest(variables),
    onSettled: refetch,
  });

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const key = 'AIzaSyCkSBVah-2JTELaurbDImw32xidwTLY6CE';
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${key}`,
          );

          const {formatted_address} = response.data.results[0];
          dispatch({
            type: 'setAddress',
            payload: {address: formatted_address, longitude, latitude},
          });
        } catch (error) {
          console.log(error);
        }
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  const average_price = Math.ceil(
    data?.find(v => v.category === category)?.[`avg_price_${time}`] || 0,
  );

  const handlePressSubmit = () => {
    if ((!price && !average_price) || !latitude || !longitude) return;
    mutate({...state, UserId: auth.id, price: price || average_price});
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        h={120}
        px={10}>
        <Heading>요청하기</Heading>
        <ModalFormAddress label="위치 수동입력" onComplete={v => dispatch(v)} />
      </HStack>
      <Text color="gray.600" bold alignSelf="flex-end" px={10} pb={5}>
        {address || '위치를 찾을 수 없습니다'}
      </Text>
      <Divider />
      <ScrollView>
        <VStack flex={1} p={5} space={10}>
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

            <Text color="info.600">
              {`* 아래 금액은 업체들이 설정한 평균 희망금액입니다.${'\n'}수정하여 제출할 수 있습니다.`}
            </Text>
          </VStack>
          <ModalFormURequest
            values={{
              price,
              description,
              address_detail,
              average_price,
            }}
            onComplete={v => dispatch({type: 'setDetail', payload: v})}
          />
          <Button
            onPress={handlePressSubmit}
            isDisabled={(!price && !average_price) || !latitude || !longitude}>
            요청하기
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
