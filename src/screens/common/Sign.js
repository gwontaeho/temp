import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Text, VStack, Input, FormControl} from 'native-base';
import {AuthContext} from '@context';

export const Sign = () => {
  const {auth, signIn} = useContext(AuthContext);

  const handlePressSign = () => {
    signIn({auth: 'asdasd'});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <VStack flex={1} p={5} borderWidth={1} space={5}>
        <FormControl>
          <FormControl.Label>휴대폰 번호</FormControl.Label>
          <Input h={10} size="md" />
        </FormControl>
        <FormControl>
          <FormControl.Label>인증번호</FormControl.Label>
          <Input h={10} size="md" />
        </FormControl>
        <Button onPress={handlePressSign}>로그인</Button>
        <Button onPress={handlePressSign} variant="solid">
          업체 등록 문의
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
