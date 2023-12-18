import React from 'react';
import {Button, Text, VStack, HStack, Badge, Checkbox} from 'native-base';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

import {toDecimalString} from '@utils';

export const HistoryCard = ({item, selected, setSelected}) => {
  const navigation = useNavigation();
  const {
    id,
    category,
    personnel,
    time,
    status,
    share,
    updatedAt,
    completedAt,
    address_short,
    distance,
    price,
    hasReview,
  } = item;

  const dateStr =
    status === 4 || status === 5
      ? dayjs(completedAt).format('YY. MM. DD')
      : `${dayjs().diff(updatedAt, 'minute')}분 전`;

  const info =
    `${category} · ${time}분 · ${personnel}인 · ${distance}km` +
    (!address_short ? '' : ` · (${address_short})`);

  const shareStr = share ? '업체' : '사용자';
  const shareColorScheme = share ? 'secondary' : 'primary';

  const statusStr =
    status === 2 ? '대기 중' : status === 3 ? '진행 중' : '완료';
  const borderColor =
    status === 2 ? 'info.600' : status === 3 ? 'success.600' : 'gray.600';
  const colorScheme = status === 2 ? 'info' : status === 3 ? 'success' : 'gray';

  return (
    <VStack
      p={3}
      rounded="sm"
      borderColor={borderColor}
      borderWidth={1}
      space={3}>
      <HStack justifyContent="space-between">
        <HStack space={1} alignItems="center">
          {(status === 4 || status === 5) && (
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

      <HStack alignItems="flex-end" justifyContent="space-between">
        <VStack space={1}>
          <Text>{info}</Text>
          <Text fontSize="lg">{toDecimalString(price)}원</Text>
        </VStack>
        <Button
          borderColor="primary.600"
          variant="outline"
          size="sm"
          onPress={() => navigation.navigate('CHistory', item)}>
          자세히
        </Button>
      </HStack>
      {(status === 4 || status === 5) && !hasReview && (
        <Text alignSelf="flex-end">* 후기를 작성해주세요</Text>
      )}
    </VStack>
  );
};
