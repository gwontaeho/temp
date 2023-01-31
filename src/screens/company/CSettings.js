import React, {useContext, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  View,
  Heading,
} from 'native-base';
import dayjs from 'dayjs';
import {AuthContext} from 'contexts';

export const CSettings = ({navigation}) => {
  const {auth, signOut, getData} = useContext(AuthContext);
  const {Company} = auth;
  const {name, expiration, max_count, distance} = Company;

  const expireStr = expiration ? dayjs(expiration).format('YYYY. MM. DD') : '-';

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  return (
    <SafeAreaView flex={1}>
      <View h={100} px={5} justifyContent="center">
        <Heading>설정</Heading>
      </View>
      <Divider />
      <VStack flex={1} p={5} space={5}>
        <VStack
          py={3}
          px={5}
          space={3}
          borderWidth={1}
          rounded="sm"
          borderColor="gray.300">
          <HStack>
            <VStack flex={1}>
              <Text color="gray.600">업체명</Text>
              <Text fontSize="md">{name}</Text>
            </VStack>
            <VStack flex={1}>
              <Text color="gray.600">동시 요청 가능횟수</Text>
              <Text fontSize="md">{max_count}</Text>
            </VStack>
          </HStack>
          <HStack>
            <VStack flex={1}>
              <Text color="gray.600">요청 범위</Text>
              <Text fontSize="md">{(distance / 1000).toFixed(1)}km</Text>
            </VStack>
            <VStack flex={1}>
              <Text color="gray.600">만료일</Text>
              <Text fontSize="md">{expireStr}</Text>
            </VStack>
          </HStack>
        </VStack>

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
