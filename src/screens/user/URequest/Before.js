import React, {useEffect, useReducer} from 'react';
import {SafeAreaView} from 'react-native';
import {VStack, Button, Heading, Input, ScrollView, Text} from 'native-base';
import Geolocation from 'react-native-geolocation-service';

const initialState = {
  longitude: 0,
  latitude: 0,
  category: '타이',
  time: 60,
  price: 0,
  description: '',
  personnel: 1,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'setPersonnel':
      return {...state, personnel: payload};
    case 'setCategory':
      return {...state, category: payload};
    case 'setTime':
      return {...state, time: payload};
    case 'setDescription':
      return {...state, description: payload};
  }
};

export const Before = () => {
  const personnels = [1, 2, 3, 4];
  const categories = ['타이', '아로마', '스웨디시', '스페셜'];
  const times = [60, 90, 120, 150];

  const [state, dispatch] = useReducer(reducer, initialState);
  const {personnel, category, time} = state;

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  return (
    <SafeAreaView flex={1}>
      <Heading p={10}>요청하기</Heading>
      <ScrollView>
        <VStack flex={1} py={5} px={10} space={5}>
          <Button alignSelf="flex-end">위치 수동입력</Button>
          <Button.Group isAttached w="full">
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
          <Button.Group isAttached w="full">
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

          <Button.Group isAttached w="full">
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
          <VStack space={1}>
            <Text>금액</Text>
            <Input size="md" h={10} />
          </VStack>
          <VStack space={1}>
            <Text>요청 사항</Text>
            <Input size="md" h={10} />
          </VStack>
        </VStack>
      </ScrollView>
      <Button m={10}>확인</Button>
    </SafeAreaView>
  );
};
