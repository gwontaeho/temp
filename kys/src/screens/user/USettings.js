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
  ScrollView,
} from 'native-base';
import {AuthContext} from '@contexts';
import {ModalSettings} from '@components';

export const USettings = () => {
  const {auth, signOut, getData} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <View h={100} px={5} justifyContent="center">
        <Heading>설정</Heading>
      </View>
      <Divider />
      <ScrollView>
        <VStack flex={1} p={5} space={5}>
          <ModalSettings />
        </VStack>
      </ScrollView>
      <Button onPress={signOut} m={5}>
        로그아웃
      </Button>
    </SafeAreaView>
  );
};
