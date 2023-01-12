import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Heading, Button, VStack} from 'native-base';
import {AuthContext} from 'contexts';

export const Inquiry = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <VStack
        flex={1}
        space={10}
        p={5}
        alignItems="center"
        justifyContent="center">
        <Heading>업체등록 대기중입니다</Heading>
        <Button onPress={signOut} w="full">
          로그아웃
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
