import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Text, Button, useDisclose, VStack, View} from 'native-base';
import {useQuery, useMutation} from '@apollo/client';
import {GET_ACCOUNT_CASH, CREATE_PARTICIPATION} from '#apollo/gql';

import {Pin} from '#components/modals';

export const Payment_Check = ({route, navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {id, amount, bondPrice} = {...route.params};
  const price = amount * bondPrice;

  const {data} = useQuery(GET_ACCOUNT_CASH, {fetchPolicy: 'no-cache'});
  const balance = data?.accountCash?.balance || 0;

  const [createParticipation] = useMutation(CREATE_PARTICIPATION, {
    variables: {id, balance: amount * bondPrice},
    onCompleted: data => console.log(data),
  });

  const handlePressSubmit = useCallback(() => {
    createParticipation();
  }, []);

  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} space={5}>
        <View bg="#fff" p={5}>
          <Text>최종 결제 금액</Text>
          <Text fontSize="lg" mb={5} bold>
            {price.toLocaleString()}원
          </Text>
          <Text>보유 예치금</Text>
          <Text fontSize="lg" bold>
            {balance.toLocaleString()}원
          </Text>
          <Text>결제시 차액 {(balance - price).toLocaleString()}원</Text>
        </View>
        <View flex={1} bg="#fff" p={5}>
          <Text>주의사항</Text>
          <Text>-주의사항1</Text>
          <Text>-주의사항2</Text>
          <Text>-주의사항3</Text>
          <Text>-주의사항4</Text>
        </View>
        <Button onPress={handlePressSubmit}>다음</Button>
      </VStack>
      <Pin
        isOpen={isOpen}
        onClose={onClose}
        onComplete={() => navigation.navigate('Payment_Complete')}
      />
    </SafeAreaView>
  );
};
