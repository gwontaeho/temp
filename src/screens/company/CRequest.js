import React, {useState, useContext} from 'react';
import {SafeAreaView, KeyboardAvoidingView, Alert} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Badge,
  FormControl,
  Input,
  ScrollView,
} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {acceptRequestByCompany} from '@apis';
import {AuthContext} from '@contexts';

export const CRequest = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const {auth} = useContext(AuthContext);

  const {params = {}} = route;
  const {id, category, price, time, personnel, description, distance, share} =
    params;
  const d = (distance / 1000).toFixed(1);

  const badgeStr = share ? '업체 공유' : '사용자 요청';
  const borderColor = share ? 'secondary.600' : 'primary.600';
  const colorScheme = share ? 'secondary' : 'primary';

  const [description_company, setDescription_company] = useState('');

  const {mutate} = useMutation({
    mutationFn: () =>
      acceptRequestByCompany({
        id,
        TargetId: auth.id,
        description_company,
        distance: d,
      }),
    onSuccess: ({code}) => {
      if (code === 1) navigation.goBack();
      if (code === 0) {
        Alert.alert('', '이미 매칭된 요청입니다', [
          {text: '확인', onPress: navigation.goBack},
        ]);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CHistories']});
      await queryClient.invalidateQueries({queryKey: ['CRequests']});
    },
  });

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <VStack
            p={5}
            space={10}
            borderWidth={1}
            borderColor={borderColor}
            m={5}
            rounded="sm">
            <Badge
              alignSelf="flex-start"
              variant="outline"
              colorScheme={colorScheme}>
              {badgeStr}
            </Badge>

            <Text
              textAlign="center"
              fontSize="xl">{`${category} · ${time}분 · ${personnel}인 · ${d}km \n ${price}원`}</Text>

            <VStack space={5}>
              <VStack space={1}>
                <Text color="gray.600">요청 메세지</Text>
                <Text fontSize="md">{description || '-'}</Text>
              </VStack>

              <FormControl>
                <FormControl.Label>업체 메세지</FormControl.Label>
                <Input
                  value={description_company}
                  variant="underlined"
                  maxLength={30}
                  onChangeText={v => setDescription_company(v)}
                />
              </FormControl>
            </VStack>

            <Button onPress={mutate}>수락하기</Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
