import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {VStack, Button, Heading, Center, View, Divider} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {completeRequestByUser} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormInput} from '@components';

export const Review = ({data, refetch}) => {
  const queryClient = useQueryClient();

  const {auth} = useContext(AuthContext);

  const {id, TargetId} = data;

  const [content, setContent] = useState('');

  const {mutate} = useMutation({
    mutationFn: variables => completeRequestByUser(variables),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['CShares']});

      refetch();
    },
  });

  const handlePressSubmit = block => {
    const variables = {id, content, UserId: auth.id, TargetId, block};
    mutate(variables);
  };

  return (
    <SafeAreaView flex={1}>
      <View h={120} justifyContent="center">
        <Heading px={10}>업체 평가하기</Heading>
      </View>
      <Divider />

      <Center p={5} flex={1}>
        <ModalFormInput
          value={content}
          label="후기를 작성해주세요"
          InputProps={{multiline: true, h: 100}}
          onComplete={v => setContent(v)}
        />
      </Center>

      <VStack mx={5} my={5} space={3}>
        <Button onPress={() => handlePressSubmit(true)}>
          이 업체 또 만나기
        </Button>
        <Button onPress={() => handlePressSubmit(false)}>만나지 않기</Button>
      </VStack>
    </SafeAreaView>
  );
};
