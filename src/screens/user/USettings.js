import React, {useCallback, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Text,
  VStack,
  Pressable,
  HStack,
  Divider,
  Input,
  Heading,
} from 'native-base';
import {AuthContext} from '@context';

export const USettings = () => {
  const {auth, signOut} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} p={5}>
        <Heading>설정</Heading>

        <Button onPress={signOut}>로그아웃</Button>
      </VStack>
    </SafeAreaView>
  );
};
