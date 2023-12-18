import React, {useState, useEffect, useReducer, useContext} from 'react';
import {SafeAreaView, Platform, KeyboardAvoidingView} from 'react-native';
import {
  VStack,
  Button,
  Heading,
  ScrollView,
  Text,
  HStack,
  Divider,
  FormControl,
  Input,
} from 'native-base';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {useQuery, useMutation} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';

import {createRequest, getAveragePrices} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormAddress} from '@components';

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
  address_short: '',
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'setPersonnel':
      return {...state, personnel: payload};
    case 'setCategory':
      return {...state, category: payload};
    case 'setTime':
      return {...state, time: payload};
    case 'setPrice':
      return {...state, price: payload};
    case 'setAddress':
      return {...state, ...payload};
    case 'setAddress_Detail':
      return {...state, address_detail: payload};
    case 'setDescription':
      return {...state, description: payload};
  }
};

export const Before = ({refetch}) => {
  const {auth, permissions} = useContext(AuthContext);

  const numReg = /^[0-9]*$/;
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
  const [isErrored, setIsErrored] = useState(false);

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

          const {formatted_address, address_components} =
            response.data.results[0];

          const dong = address_components.find(v =>
            v.types.includes('sublocality_level_2'),
          )?.long_name;
          const ro = address_components.find(v =>
            v.types.includes('sublocality_level_4'),
          )?.long_name;

          dispatch({
            type: 'setAddress',
            payload: {
              address: formatted_address.replace('대한민국 ', ''),
              address_short: dong || ro,
              longitude,
              latitude,
            },
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
    if (!address_detail || (!price && !average_price) || !numReg.test(price))
      return setIsErrored(true);

    if ((!price && !average_price) || !latitude || !longitude) return;
    mutate({...state, UserId: auth.id, price: price || average_price});
  };

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          h={100}
          px={5}>
          <Heading>요청하기</Heading>
          <ModalFormAddress
            label="위치 수동입력"
            address={address}
            onComplete={v => dispatch(v)}
          />
        </HStack>

        <HStack px={5} pb={5} alignItems="center" space={1}>
          <Icon
            name="location-outline"
            size={16}
            color={!permissions.location || !address ? '#e11d48' : '#000'}
          />
          <Input
            flex={1}
            isReadOnly
            h={10}
            color={!permissions.location || !address ? 'danger.600' : 'black'}
            value={
              permissions.location
                ? address || '위치를 입력해 주세요'
                : '위치 권한을 허용해주세요'
            }
            InputRightElement={
              <Button
                size="sm"
                rounded="none"
                h="full"
                onPress={getCurrentPosition}>
                <Icon name="refresh" size={16} color="#fff" />
              </Button>
            }
          />
        </HStack>

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
                      onPress={() =>
                        dispatch({type: 'setPersonnel', payload: v})
                      }
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
                      onPress={() =>
                        dispatch({type: 'setCategory', payload: v})
                      }
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
                {`아래 금액은 업체들이 설정한 평균 희망금액입니다.${'\n'}수정하여 제출할 수 있습니다.`}
              </Text>
            </VStack>

            <VStack space={3}>
              <FormControl
                isInvalid={
                  isErrored &&
                  (!numReg.test(price) || (!price && !average_price))
                }>
                <FormControl.Label>금액 *</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  maxLength={6}
                  value={price}
                  placeholder={average_price.toString()}
                  onChangeText={v => dispatch({type: 'setPrice', payload: v})}
                  variant="underlined"
                />
                <FormControl.ErrorMessage>
                  금액을 정확히 입력해주세요
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={isErrored && !address_detail}>
                <FormControl.Label>상세 주소 *</FormControl.Label>
                <Input
                  value={address_detail}
                  maxLength={30}
                  onChangeText={v =>
                    dispatch({type: 'setAddress_Detail', payload: v})
                  }
                  variant="underlined"
                  placeholder="동, 호수등 상세주소를 적어주세요"
                />
                <FormControl.ErrorMessage>
                  상세 주소가 필요합니다
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl>
                <FormControl.Label>요청 사항</FormControl.Label>
                <Input
                  value={description}
                  maxLength={30}
                  onChangeText={v =>
                    dispatch({type: 'setDescription', payload: v})
                  }
                  variant="underlined"
                />
              </FormControl>
            </VStack>
            <Button
              onPress={handlePressSubmit}
              // isDisabled={
              //   (!price && !average_price) ||
              //   !latitude ||
              //   !longitude ||
              //   !address_detail
              // }
            >
              요청하기
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
