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

export const AUsers = ({navigation}) => {
  const {auth, signOut} = useContext(AuthContext);

  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} py={5} px={10}></VStack>
    </SafeAreaView>
  );
};
