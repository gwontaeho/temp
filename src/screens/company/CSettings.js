import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Pressable,
  HStack,
  Divider,
  Input,
  View,
  Heading,
} from 'native-base';
import {AuthContext} from 'contexts';

export const CSettings = ({navigation}) => {
  const {auth, signOut} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <View h={120} px={10} justifyContent="center">
        <Heading>설정</Heading>
      </View>
      <Divider />
      <VStack flex={1} p={5} space={5}>
        <Button
          variant="outline"
          onPress={() => navigation.navigate('CPrices')}>
          단가 관리
        </Button>
        <Divider />
        <Button onPress={signOut}>로그아웃</Button>
      </VStack>
    </SafeAreaView>
  );
};
