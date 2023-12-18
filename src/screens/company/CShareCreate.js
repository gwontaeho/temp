import React, {useState, useReducer, useContext} from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {
  VStack,
  Button,
  ScrollView,
  Text,
  HStack,
  FormControl,
  Input,
} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import {createRequest, getAveragePrices} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormAddress} from '@components';

const initialState = {
  longitude: 0,
  latitude: 0,
  category: '타이',
  time: 60,
  price: '',
  description: '',
  personnel: 1,
  address: '',
  address_short: '',
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
    case 'setPrice':
      return {...state, price: payload};
    case 'setPhone':
      return {...state, phone: payload};
    case 'setAddress':
      return {...state, ...payload};
    case 'setAddress_detail':
      return {...state, address_detail: payload};
    case 'setDescription':
      return {...state, description: payload};
  }
};

export const CShareCreate = ({navigation}) => {
  const headerHeight = useHeaderHeight();
  const {auth} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const numReg = /^[0-9]*$/;

  const personnels = [1, 2, 3, 4];
  const categories = ['타이', '아로마', '스웨디시', '스페셜'];
  const times = [60, 90, 120, 150];

  const [isErrored, setIsErrored] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    personnel,
    price,
    latitude,
    longitude,
    description,
    address_detail,
    category,
    time,
    address,
    phone,
  } = state;

  const {data} = useQuery({
    queryKey: ['AveragePrices'],
    queryFn: getAveragePrices,
  });

  const {mutate} = useMutation({
    mutationFn: variables => createRequest(variables),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CShares']});
      navigation.navigate('CShares');
    },
  });

  const average_price = Math.ceil(
    data?.find(v => v.category === category)?.[`avg_price_${time}`] || 0,
  );

  const handlePressSubmit = () => {
    if (!numReg.test(phone)) dispatch({type: 'setPhone', payload: ''});
    if (!numReg.test(price)) dispatch({type: 'setPrice', payload: ''});
    if (
      !address_detail ||
      (!price && !average_price) ||
      !numReg.test(price) ||
      !numReg.test(phone)
    )
      return setIsErrored(true);

    if ((!price && !average_price) || !latitude || !longitude || !phone) return;
    mutate({
      ...state,
      UserId: auth.id,
      share: true,
      price: price || average_price,
    });
  };

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView
        flex={1}
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <VStack flex={1} p={5} space={10}>
            <HStack alignItems="center" space={1}>
              <Icon
                name="location-outline"
                size={16}
                color={!address ? '#e11d48' : '#000'}
              />
              <Input
                h={10}
                flex={1}
                isReadOnly
                color={address ? 'black' : 'danger.600'}
                value={address || '위치를 입력해주세요'}
                InputRightElement={
                  <ModalFormAddress
                    type="input"
                    label="고객위치 입력"
                    address={address}
                    onComplete={v => dispatch(v)}
                  />
                }
              />
            </HStack>

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
            </VStack>

            <VStack space={3}>
              <FormControl
                isInvalid={
                  isErrored &&
                  (!numReg.test(price) || (!price && !average_price))
                }>
                <FormControl.Label>금액 *</FormControl.Label>
                <Input
                  value={price}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder={average_price.toString()}
                  onChangeText={v => dispatch({type: 'setPrice', payload: v})}
                  variant="underlined"
                />
                <FormControl.ErrorMessage>
                  금액을 정확히 입력해주세요
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={isErrored && !phone}>
                <FormControl.Label>연락처 *</FormControl.Label>
                <Input
                  value={phone}
                  keyboardType="number-pad"
                  maxLength={11}
                  onChangeText={v => dispatch({type: 'setPhone', payload: v})}
                  variant="underlined"
                  placeholder="고객 연락처는 수락하기 전까지 타업체에게 제공되지 않습니다"
                />
                <FormControl.ErrorMessage>
                  연락처가 필요합니다
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={isErrored && !address_detail}>
                <FormControl.Label>상세 주소 *</FormControl.Label>
                <Input
                  value={address_detail}
                  onChangeText={v =>
                    dispatch({type: 'setAddress_detail', payload: v})
                  }
                  variant="underlined"
                  placeholder="상세주소는 수락 전까지 타업체에 제공되지 않습니다"
                />
                <FormControl.ErrorMessage>
                  상세 주소가 필요합니다
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl>
                <FormControl.Label>요청 사항</FormControl.Label>
                <Input
                  value={description}
                  onChangeText={v =>
                    dispatch({type: 'setDescription', payload: v})
                  }
                  variant="underlined"
                />
              </FormControl>
            </VStack>

            <Button
              onPress={handlePressSubmit}
              isDisabled={
                (!price && !average_price) ||
                !latitude ||
                !longitude ||
                !address_detail ||
                !phone ||
                !numReg.test(phone)
              }>
              요청하기
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
