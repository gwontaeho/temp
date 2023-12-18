import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  VStack,
  Button,
  Heading,
  View,
  Divider,
  FormControl,
  Input,
  ScrollView,
  Text,
} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createReview} from '@apis';
import {toDecimalString} from '@utils';

export const CReview = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const params = route.params || {};

  const {id, category, time, personnel, price, UserId, isDeleted_1} = params;

  const [content, setContent] = useState('');

  const {mutate} = useMutation({
    mutationFn: variables => createReview(variables),
    onSettled: async () => {
      if (isDeleted_1) {
        await queryClient.invalidateQueries({queryKey: ['CDeleted']});
        navigation.navigate('CDeleted');
      } else {
        await queryClient.invalidateQueries({queryKey: ['CHistories']});
        navigation.navigate('CHistories');
      }
    },
  });

  const handlePress = block => {
    const variables = {id, TargetId: UserId, content, block};
    mutate(variables);
  };

  return (
    <SafeAreaView flex={1}>
      <View h={100} justifyContent="center">
        <Heading px={5}>사용자 평가하기</Heading>
      </View>
      <Divider />

      <ScrollView>
        <VStack p={5} space={10}>
          <VStack alignItems="center">
            <Text fontSize="md">{`${category} · ${time}분 · ${personnel}명 · ${toDecimalString(
              price,
            )}원`}</Text>
          </VStack>

          <FormControl>
            <FormControl.Label>후기를 작성해주세요</FormControl.Label>
            <Input
              value={content}
              variant="underlined"
              onChangeText={v => setContent(v)}
              multiline
              h={100}
            />
          </FormControl>

          <VStack space={3}>
            <Button
              onPress={() => handlePress(false)}
              borderWidth={1}
              borderColor="primary.600">
              이 사용자 또 만나기
            </Button>
            <Button
              variant="outline"
              borderColor="primary.600"
              onPress={() => handlePress(true)}>
              만나지 않기
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
