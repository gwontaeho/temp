import React from 'react';
import {SafeAreaView, Alert, Linking} from 'react-native';
import dayjs from 'dayjs';
import {Button, Text, VStack, Badge, HStack, ScrollView} from 'native-base';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {completeRequestByCompany, cancelRequestByCompany} from '@apis';
import Clipboard from '@react-native-clipboard/clipboard';
import {toDecimalString} from 'utils';

export const CHistory = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const {params = {}} = route;
  const {
    id,
    category,
    price,
    time,
    personnel,
    description,
    description_company,
    address,
    address_detail,
    status,
    share,
    User,
    updatedAt,
    completedAt,
    hasReview,
    phone,
  } = params;

  const today = dayjs();
  const completed = dayjs(completedAt);
  const updated = dayjs(updatedAt);
  const diff = today.diff(updated, 'minute');

  const dateStr =
    status === 4 || status === 5
      ? completed.format('YY. MM. DD')
      : `${diff}분 전`;

  const shareStr = share ? '업체' : '사용자';
  const shareColorScheme = share ? 'secondary' : 'primary';

  const statusStr =
    status === 2 ? '대기 중' : status === 3 ? '진행 중' : '완료';
  const borderColor =
    status === 2 ? 'info.600' : status === 3 ? 'success.600' : 'gray.600';
  const colorScheme = status === 2 ? 'info' : status === 3 ? 'success' : 'gray';

  const {mutate: completeMutate} = useMutation({
    mutationFn: () => completeRequestByCompany(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CHistories']});
      navigation.goBack();
    },
  });

  const {mutate: cancelMutate} = useMutation({
    mutationFn: () => cancelRequestByCompany(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['CHistories']});
      await queryClient.invalidateQueries({queryKey: ['CRequests']});
      navigation.goBack();
    },
  });

  const handlePressCopy = () => {
    Clipboard.setString(address);
    Alert.alert('', '주소가 복사되었습니다', [{text: '확인'}]);
  };

  const handlePressTel = tel => {
    Linking.openURL(`tel:${tel}`);
  };

  const handlePressCancel = () => {
    Alert.alert(
      '',
      '고의적으로 취소 반복 시 이용이 정지될 수 있습니다. 취소하시겠습니까?',
      [{text: '아니요'}, {text: '네', onPress: () => cancelMutate()}],
    );
  };

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VStack
          p={5}
          space={10}
          borderWidth={1}
          borderColor={borderColor}
          m={5}
          rounded="sm">
          <HStack justifyContent="space-between">
            <HStack space={1}>
              <Badge
                alignSelf="flex-start"
                variant="outline"
                colorScheme={shareColorScheme}>
                {shareStr}
              </Badge>
              <Badge
                alignSelf="flex-start"
                variant="outline"
                colorScheme={colorScheme}>
                {statusStr}
              </Badge>
            </HStack>
            <Text fontSize="xs">{dateStr}</Text>
          </HStack>

          <Text
            textAlign="center"
            fontSize="xl">{`${category} · ${time}분 · ${personnel}인 · ${toDecimalString(
            price,
          )}원`}</Text>

          <VStack space={5} rounded="sm" borderColor="gray.300">
            {status !== 2 && (
              <HStack justifyContent="space-between" space={3}>
                <VStack space={1}>
                  <Text color="gray.600">연락처</Text>
                  <Text fontSize="md">{share ? phone : User.phone}</Text>
                </VStack>
                <Button
                  size="sm"
                  alignSelf="flex-end"
                  variant="outline"
                  onPress={() => handlePressTel(share ? phone : User.phone)}>
                  전화하기
                </Button>
              </HStack>
            )}

            {status !== 2 && share && (
              <HStack justifyContent="space-between" space={3}>
                <VStack space={1}>
                  <Text color="gray.600">업체 연락처</Text>
                  <Text fontSize="md">{User.phone}</Text>
                </VStack>
                <Button
                  size="sm"
                  alignSelf="flex-end"
                  variant="outline"
                  onPress={() => handlePressTel(User.phone)}>
                  전화하기
                </Button>
              </HStack>
            )}

            {status !== 2 && (
              <HStack justifyContent="space-between" space={3}>
                <VStack space={1} flex={1}>
                  <Text color="gray.600">주소</Text>
                  <VStack>
                    <Text fontSize="md">{`${address}`}</Text>
                    {!!address_detail && (
                      <Text fontSize="md">{`${address_detail}`}</Text>
                    )}
                  </VStack>
                </VStack>
                <Button
                  size="sm"
                  alignSelf="flex-end"
                  variant="outline"
                  onPress={handlePressCopy}>
                  복사하기
                </Button>
              </HStack>
            )}

            <VStack space={1}>
              <Text color="gray.600">요청 메세지</Text>
              <Text fontSize="md">{description || '-'} </Text>
            </VStack>

            <VStack space={1}>
              <Text color="gray.600">업체 메세지</Text>
              <Text fontSize="md">{description_company || '-'}</Text>
            </VStack>
          </VStack>
          {(status === 2 || status === 3) && (
            <VStack space={3}>
              <Button onPress={handlePressCancel}>취소</Button>
              {status === 3 && (
                <Button onPress={completeMutate} isDisabled={time > diff}>
                  {`완료 (${diff}분 진행중)`}
                </Button>
              )}
            </VStack>
          )}
          {(status === 4 || status === 5) && !hasReview && (
            <Button onPress={() => navigation.navigate('CReview', params)}>
              리뷰작성
            </Button>
          )}
          <Text color="info.600">
            사용자, 업체 양측 수락 후에 사용자는 앱에서 임의로 취소할 수
            없습니다
          </Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
