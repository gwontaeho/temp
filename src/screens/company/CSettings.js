import React, {useContext} from 'react';
import {
  Button,
  Text,
  VStack,
  Pressable,
  HStack,
  Divider,
  Input,
} from 'native-base';
import {AuthContext} from '@context';

export const CSettings = () => {
  const {auth, signOut} = useContext(AuthContext);

  return (
    <VStack flex={1} p={5}>
      <Button onPress={signOut}>로그아웃</Button>
    </VStack>
  );
};
