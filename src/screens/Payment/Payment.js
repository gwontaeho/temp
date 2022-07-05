import React, {useCallback, useState} from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {
  Input,
  Divider,
  Button,
  VStack,
  Flex,
  View,
  Text,
  KeyboardAvoidingView,
  Toast,
} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';

export const Payment = ({route, navigation}) => {
  const headerHeight = useHeaderHeight();
  const [amount, setAmount] = useState('');

  const funding = route.params?.funding;
  const {id, bondTotalNumber, bondPrice, remainingBonds} = {...funding};

  const handleClickNext = useCallback(() => {
    if (amount)
      return navigation.navigate('Payment_Check', {amount, bondPrice, id});
    if (!Toast.isActive(0))
      return Toast.show({
        id: 0,
        description: '최소 구매수량은 1개입니다',
      });
  }, [amount]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      flex={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView flex={1}>
          <VStack space={5} flex={1}>
            <VStack p={5} space={5} bg="#fff">
              <Text>잔여수량</Text>
              <View p={5} bg="#eee" borderRadius={10}>
                <Text>
                  총 {(bondTotalNumber * bondPrice).toLocaleString()}원 중
                </Text>
                <Text fontSize="xl" bold mb={5}>
                  {remainingBonds?.[0].toLocaleString()}원
                </Text>
                <Text>1인당 구매 가능 수량 100개</Text>
                <Text>후원권 개당 가격 {bondPrice.toLocaleString()}원</Text>
              </View>
            </VStack>
            <VStack space={5} flex={1} bg="#fff" p={5}>
              <Flex direction="row" justify="space-between">
                <View>
                  <Text>구매수량</Text>
                  <Text>최대 100개</Text>
                </View>
                <Input
                  keyboardType="number-pad"
                  onChangeText={text => setAmount(text)}
                  w={100}
                  placeholder="최소 1개"
                />
              </Flex>
              <Flex direction="row" justify="space-between">
                <Text>개당가격</Text>
                <Text>{bondPrice.toLocaleString()}원</Text>
              </Flex>
              <Divider />
              <Flex align="flex-end">
                <Text fontSize="2xl" bold>
                  총 {(amount * bondPrice).toLocaleString()}원
                </Text>
              </Flex>
            </VStack>
          </VStack>
          <Button onPress={handleClickNext} rounded="none">
            다음
          </Button>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
