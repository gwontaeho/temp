import React, {useState, useEffect} from 'react';
import {SafeAreaView, Linking} from 'react-native';
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
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  cancelRequestByUser,
  rejectRequestByUser,
  acceptRequestByUser,
} from '@apis';
import {toDecimalString} from 'utils';

const ModalAccept = ({data, refetch}) => {
  const queryClient = useQueryClient();

  const {id, status, description_company, count, distance} = data;

  const {mutate: rejectMutate} = useMutation({
    mutationFn: () => rejectRequestByUser(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CShares']});
      refetch();
    },
  });

  const {mutate: acceptMutate} = useMutation({
    mutationFn: () => acceptRequestByUser(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CShares']});
      refetch();
    },
  });

  return (
    <Modal isOpen={status === 2}>
      <Modal.Content>
        <Modal.Body>
          <VStack space={5}>
            <VStack>
              <Text>업체명</Text>
              <Text fontSize="md">{`테스트`}</Text>
            </VStack>
            <VStack>
              <Text>업체메세지</Text>
              <Text fontSize="md">{description_company}</Text>
            </VStack>
            <VStack>
              <Text
                fontSize="md"
                color="gray.600">{`이 업체를 ${count}회 이용했습니다`}</Text>
              <Text
                fontSize="md"
                color="gray.600">{`업체와 고객과의 거리 ${distance}km`}</Text>
            </VStack>
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
  const navigation = useNavigation();
  const queryClient = useQueryClient();

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
    TargetId,
    Target,
    count,
    updatedAt,
    distance,
    phone,
  } = data;

  const statusStr = status === 3 ? '업체 이동 중' : '인근 업체 매칭 중';

  const {company_name} = {...Target};

  const [departure, setDeparture] = useState(0);

  const {mutate} = useMutation({
    mutationFn: () => cancelRequestByUser(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CShares']});
      navigation.goBack();
    },
  });

  useEffect(() => {
    const today = dayjs();
    const updated = dayjs(updatedAt);
    const diff = today.diff(updated, 'minutes');
    setDeparture(diff);

    if (status === 3) {
      const callBack = () => {
        const today = dayjs();
        const updated = dayjs(updatedAt);
        const diff = today.diff(updated, 'minutes');
        setDeparture(diff);
      };
      const interval = setInterval(callBack, 10000);

      return () => clearInterval(interval);
    }
  }, [status, updatedAt]);

  const handlePressTelCompany = () => {
    Linking.openURL(`tel:${Target?.phone}`);
  };
  const handlePressTel = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <>
      <SafeAreaView flex={1}>
        <HStack height={100} px={5} space={1} alignItems="center">
          <Heading>{statusStr}</Heading>
          <Spinner />
        </HStack>
        <VStack alignItems="flex-end" px={5} pb={5}>
          <HStack alignItems="center" space={1}>
            <Icon name="location-outline" size={16} color="#000" />
            <Text bold color="gray.600">
              {address}
            </Text>
          </HStack>
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
            <Text fontSize="xl">{`${toDecimalString(price)}원`}</Text>
          </VStack>
          {!!description && <Text textAlign="center">{description}</Text>}
          <VStack>
            {status === 1 && TargetId && (
              <Text fontSize="md" bold alignSelf="center" color="info.600">
                업체가 취소하여 인근업체를 재매칭합니다
              </Text>
            )}
            {(status === 1 || status === 2) && (
              <Text alignSelf="center" color="info.600">
                30분간 업체수락이 없을 시 자동 취소됩니다
              </Text>
            )}
          </VStack>
        </VStack>

        {status === 3 && (
          <VStack
            mx={5}
            py={3}
            px={5}
            space={3}
            borderWidth={1}
            rounded="sm"
            borderColor="gray.300">
            <HStack>
              <VStack flex={1}>
                <Text color="gray.600">업체명</Text>
                <Text fontSize="md">{company_name}</Text>
              </VStack>
              <VStack flex={1}>
                <Text color="gray.600">이용 횟수</Text>
                <Text fontSize="md">{count}</Text>
              </VStack>
            </HStack>
            <HStack>
              <VStack flex={1}>
                <Text color="gray.600">업체 출발시간</Text>
                <Text fontSize="md">{departure}분 전</Text>
              </VStack>
              <VStack flex={1}>
                <Text color="gray.600">고객과 상대 업체간 거리</Text>
                <Text fontSize="md">{distance}km</Text>
              </VStack>
            </HStack>
            <VStack>
              <Text color="gray.600">업체 메세지</Text>
              <Text fontSize="md">{description_company || '-'}</Text>
            </VStack>
          </VStack>
        )}
        {status === 3 && (
          <HStack mt={5} mx={5} space={3}>
            <Button flex={1} onPress={handlePressTel}>
              고객에 전화하기
            </Button>
            <Button flex={1} onPress={handlePressTelCompany}>
              업체에 전화하기
            </Button>
          </HStack>
        )}
        {(status === 1 || status === 2 || status === 3) && (
          <VStack m={5} space={3}>
            <Button onPress={mutate}>취소하기</Button>
            {/* <Text alignSelf="center" color="warning.600">
              고의적으로 취소 반복 시 이용이 정지 될 수 있습니다
            </Text> */}
          </VStack>
        )}
      </SafeAreaView>
      <ModalAccept data={data} refetch={refetch} />
    </>
  );
};
