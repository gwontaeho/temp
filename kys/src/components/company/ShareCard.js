import React from 'react';
import {Button, Text, VStack, HStack, Badge, Checkbox} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

import {toDecimalString} from '@utils';

export const ShareCard = ({item, selected, setSelected}) => {
  const navigation = useNavigation();
  const {
    id,
    category,
    price,
    personnel,
    time,
    status,
    address_short,
    completedAt,
    updatedAt,
  } = item;

  const dateStr =
    status === 0
      ? dayjs(updatedAt).format('YY. MM. DD')
      : status === 4 || status === 5
      ? dayjs(completedAt).format('YY. MM. DD')
      : `${dayjs().diff(updatedAt, 'minute')}분 전`;

  const info =
    `${category} · ${time}분 · ${personnel}인` +
    (!address_short ? '' : ` · (${address_short})`);

  const statusStr =
    status === 1
      ? '인근 업체에 요청 중'
      : status === 2
      ? '수락 대기 중'
      : status === 3
      ? '업체 이동 중'
      : status === 0
      ? '취소'
      : '완료';

  const borderColor =
    status === 1
      ? 'info.600'
      : status === 2
      ? 'warning.600'
      : status === 3
      ? 'success.600'
      : 'gray.600';

  const colorScheme =
    status === 1
      ? 'info'
      : status === 2
      ? 'warning'
      : status === 3
      ? 'success'
      : 'gray';

  return (
    <VStack
      p={3}
      rounded="sm"
      borderColor={borderColor}
      borderWidth={1}
      space={3}>
      <HStack justifyContent="space-between">
        <HStack space={1} alignItems="center">
          {(status === 4 || status === 5 || status === 0) && (
            <Checkbox
              isChecked={selected.includes(id)}
              accessibilityLabel="label"
              onChange={v =>
                setSelected(prev => {
                  if (v) return [...prev, id];
                  else return [...prev].filter(vv => vv !== id);
                })
              }
            />
          )}
          <Badge
            alignSelf="flex-start"
            variant="outline"
            colorScheme={colorScheme}>
            {statusStr}
          </Badge>
        </HStack>
        <Text fontSize="xs">{dateStr}</Text>
      </HStack>

      <HStack alignItems="flex-end" justifyContent="space-between">
        <VStack space={1}>
          <Text>{info}</Text>
          <Text fontSize="lg">{toDecimalString(price)}원</Text>
        </VStack>
        <Button
          borderColor="primary.600"
          variant="outline"
          size="sm"
          onPress={() => navigation.navigate('CShare', id)}>
          자세히
        </Button>
      </HStack>
      {status === 4 && <Text alignSelf="flex-end">* 후기를 작성해주세요</Text>}
    </VStack>
  );
};
