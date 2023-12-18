import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  VStack,
  Button,
  Heading,
  View,
  Divider,
  ScrollView,
  FormControl,
  Input,
  Text,
} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {completeRequestByUser} from '@apis';
import {AuthContext} from '@contexts';
import {toDecimalString} from 'utils';

export const Review = ({data, refetch}) => {
  const queryClient = useQueryClient();

  const {auth} = useContext(AuthContext);

  const {id, TargetId, category, time, personnel, price, Target, isDeleted_3} =
    data;
  const {company_name} = Target;

  const [content, setContent] = useState('');

  const {mutate} = useMutation({
    mutationFn: variables => completeRequestByUser(variables),
    onSettled: async () => {
      if (isDeleted_3)
        await queryClient.invalidateQueries({queryKey: ['CDeletedShare']});
      else await queryClient.invalidateQueries({queryKey: ['CShares']});
      refetch();
    },
  });

  const handlePressSubmit = block => {
    const variables = {id, content, UserId: auth.id, TargetId, block};
    mutate(variables);
  };

  return (
    <SafeAreaView flex={1}>
      <View h={100} justifyContent="center">
        <Heading px={5}>업체 평가하기</Heading>
      </View>
      <Divider />

      <ScrollView>
        <VStack p={5} space={10}>
          <VStack alignItems="center">
            <Text bold fontSize="lg">
              {company_name}
            </Text>
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
            <Button onPress={() => handlePressSubmit(false)}>
              이 업체 또 만나기
            </Button>
            <Button onPress={() => handlePressSubmit(true)}>만나지 않기</Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
