import React, {useCallback, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Pressable,
  HStack,
  Divider,
  Input,
  Heading,
  View,
} from 'native-base';
import {AuthContext} from '@contexts';

export const USettings = () => {
  const {auth, signOut} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <View h={100} px={5} justifyContent="center">
        <Heading>설정</Heading>
      </View>
      <Divider />
      <VStack flex={1} p={5}>
        <Button onPress={signOut}>로그아웃</Button>
      </VStack>
    </SafeAreaView>
  );
};
