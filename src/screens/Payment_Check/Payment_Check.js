import React, {useState} from 'react';
import {Text, Button, useDisclose, VStack, View} from 'native-base';

import {Pin} from '#components/modals';

export const Payment_Check = ({navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <VStack flex={1} space={5}>
      <View bg="#fff" p={5}>
        <Text>최종 결제 금액</Text>
        <Text fontSize="lg" mb={5} bold>
          100,000원
        </Text>
        <Text>보유 예치금</Text>
        <Text fontSize="lg" bold>
          1,500,000원
        </Text>
        <Text>결제시 차액 1,400,000원</Text>
      </View>
      <View flex={1} bg="#fff" p={5}>
        <Text>주의사항</Text>
        <Text>-주의사항1</Text>
        <Text>-주의사항2</Text>
        <Text>-주의사항3</Text>
        <Text>-주의사항4</Text>
      </View>
      <Button onPress={onOpen}>다음</Button>
      <Pin
        isOpen={isOpen}
        onClose={onClose}
        onComplete={() => navigation.navigate('Payment_Complete')}
      />
    </VStack>
  );
};
