import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  VStack,
  Button,
  Heading,
  Text,
  Spinner,
  HStack,
  Modal,
  Divider,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  cancelRequestByUser,
  rejectRequestByUser,
  acceptRequestByUser,
} from '@apis';

const ModalAccept = ({data, refetch}) => {
  const queryClient = useQueryClient();

  const {id, status, Target, TargetId, description_company} = data;

  const {mutate: rejectMutate} = useMutation({
    mutationFn: () => rejectRequestByUser(id),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['CShares']});
      refetch();
    },
  });

  const {mutate: acceptMutate} = useMutation({
    mutationFn: () => acceptRequestByUser(id),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['CShares']});
      refetch();
    },
  });

  return (
    <Modal isOpen={status === 2}>
      <Modal.Content>
        <Modal.Body alignItems="center">
          <VStack space={3} alignItems="center">
            <Text fontSize="md">{description_company}</Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack flex={1} space={3}>
            <Button variant="outline" onPress={rejectMutate} flex={1}>
              거절
            </Button>
            <Button onPress={acceptMutate} flex={1}>
              수락
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const After = ({data, refetch}) => {
  const {
    id,
    status,
    category,
    price,
    time,
    personnel,
    address,
    address_detail,
    description,
    description_company,
  } = data;

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () => cancelRequestByUser(id),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['CShares']});
      navigation.goBack();
    },
  });

  const statusStr = status === 3 ? '업체 이동 중' : '인근 업체 매칭 중';

  return (
    <>
      <SafeAreaView flex={1}>
        <HStack height={120} px={10} space={1} alignItems="center">
          <Heading>{statusStr}</Heading>
          <Spinner />
        </HStack>
        <VStack alignItems="flex-end" px={10} pb={5}>
          <Text bold color="gray.600">
            {address}
          </Text>
          {!!address_detail && (
            <Text bold color="gray.600">
              {address_detail}
            </Text>
          )}
        </VStack>
        <Divider />
        <VStack flex={1} alignItems="center" justifyContent="center" space={3}>
          <VStack alignItems="center">
            <Text fontSize="xl">{`${category} · ${time}분 · ${personnel}명`}</Text>
            <Text fontSize="xl">{`${price}원`}</Text>
          </VStack>
          {!!description && <Text>{description}</Text>}
        </VStack>

        {status === 3 && !!description_company && (
          <VStack
            mx={5}
            py={3}
            px={5}
            borderWidth={1}
            rounded="sm"
            borderColor="gray.300">
            <Text color="gray.600" fontSize="xs">
              업체 메세지
            </Text>
            <Text>{description_company}</Text>
          </VStack>
        )}

        {(status === 1 || status === 2) && (
          <VStack m={5} space={1}>
            <Text alignSelf="center" color="warning.600">
              고의적으로 취소 반복 시 이용이 정지 될 수 있습니다
            </Text>
            <Button onPress={mutate}>취소하기</Button>
          </VStack>
        )}

        {status === 3 && (
          <HStack m={5} space={3}>
            <Button flex={1}>전화하기</Button>
          </HStack>
        )}
      </SafeAreaView>
      <ModalAccept data={data} refetch={refetch} />
    </>
  );
};
