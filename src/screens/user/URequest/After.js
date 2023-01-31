import React, {useState, useEffect} from 'react';
import {SafeAreaView, Linking, Alert} from 'react-native';
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
import {useMutation} from '@tanstack/react-query';
import {
  cancelRequestByUser,
  rejectRequestByUser,
  acceptRequestByUser,
} from '@apis';

const ModalAccept = ({data, refetch}) => {
  const {id, status, description_company, count, distance, Target} = data;
  const {company_name} = {...Target};

  const {mutate: rejectMutate} = useMutation({
    mutationFn: () => rejectRequestByUser(id),
    onSettled: refetch,
  });

  const {mutate: acceptMutate} = useMutation({
    mutationFn: () => acceptRequestByUser(id),
    onSettled: refetch,
  });

  return (
    <Modal isOpen={status === 2}>
      <Modal.Content>
        <Modal.Body>
          <VStack space={5}>
            <VStack>
              <Text>업체명</Text>
              <Text fontSize="md">{`${company_name}`}</Text>
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
                color="gray.600">{`업체와의 거리 ${distance}km`}</Text>
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
    Target,
    TargetId,
    count,
    updatedAt,
    distance,
  } = data;
  const phone = Target?.phone;
  const {company_name} = {...Target};
  const statusStr = status === 3 ? '업체 이동 중' : '인근 업체 매칭 중';

  const [departure, setDeparture] = useState(0);

  const {mutate} = useMutation({
    mutationFn: () => cancelRequestByUser(id),
    onSettled: refetch,
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

  const handlePressTel = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handlePressCancel = () => {
    Alert.alert(
      '',
      '고의적으로 취소 반복 시 이용이 정지될 수 있습니다. 취소하시겠습니까?',
      [{text: '아니요'}, {text: '네', onPress: () => mutate()}],
    );
  };

  return (
    <>
      <SafeAreaView flex={1}>
        <HStack height={100} px={5} space={1} alignItems="center">
          <Heading>{statusStr}</Heading>
          <Spinner />
        </HStack>
        <VStack alignItems="flex-end" px={5} pb={5}>
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
          {status === 1 && TargetId && (
            <Text fontSize="md" bold alignSelf="center" color="info.600">
              업체가 취소하여 인근업체를 재매칭합니다
            </Text>
          )}
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
                <Text color="gray.600">내가 이용한 횟수</Text>
                <Text fontSize="md">{count}</Text>
              </VStack>
            </HStack>
            <HStack>
              <VStack flex={1}>
                <Text color="gray.600">업체 출발시간</Text>
                <Text fontSize="md">{departure}분 전</Text>
              </VStack>
              <VStack flex={1}>
                <Text color="gray.600">나와의 거리</Text>
                <Text fontSize="md">{distance}km</Text>
              </VStack>
            </HStack>
            <VStack>
              <Text color="gray.600">업체 메세지</Text>
              <Text fontSize="md">{description_company || '-'}</Text>
            </VStack>
          </VStack>
        )}

        {(status === 1 || status === 2 || status === 3) && (
          <VStack p={5} space={3}>
            {status === 3 && <Button onPress={handlePressTel}>전화하기</Button>}
            <Button onPress={handlePressCancel}>취소하기</Button>
            <Text alignSelf="center" color="warning.600">
              고의적으로 취소 반복 시 이용이 정지 될 수 있습니다
            </Text>
          </VStack>
        )}
      </SafeAreaView>
      <ModalAccept data={data} refetch={refetch} />
    </>
  );
};
