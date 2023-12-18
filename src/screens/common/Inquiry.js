import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Heading, Button, VStack, Text} from 'native-base';
import {AuthContext} from 'contexts';

export const Inquiry = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <VStack
        flex={1}
        space={10}
        p={10}
        alignItems="center"
        justifyContent="center">
        <Heading>업체등록 대기중입니다</Heading>
        <VStack alignItems="center">
          <Text mb={3}>업체등록 문의 : 카카오톡 365homethai</Text>
          <Text>세금계산서 발행을 원하실경우</Text>
          <Text>사업자등록번호와 신분증 사본이 필요합니다</Text>
        </VStack>
        <Button onPress={signOut} w="full">
          로그아웃
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
