import React from 'react';
import {Button, Text, VStack, HStack, Badge} from 'native-base';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

import {toDecimalString} from '@utils';

export const RequestCard = ({item}) => {
  const navigation = useNavigation();

  const {
    category,
    time,
    personnel,
    distance,
    share,
    price,
    address_short,
    updatedAt,
  } = item;

  const d = (distance / 1000).toFixed(1);

  const shareStr = share ? '업체 공유' : '사용자 요청';
  const borderColor = share ? 'secondary.600' : 'primary.600';
  const colorScheme = share ? 'secondary' : 'primary';

  const diff = dayjs().diff(updatedAt, 'minutes');

  const info =
    `${category} · ${time}분 · ${personnel}인 · ${d}km` +
    (!address_short ? '' : ` · (${address_short})`);

  const handlePressDetail = () => {
    navigation.navigate('CRequest', item);
  };

  return (
    <VStack
      p={3}
      rounded="sm"
      space={3}
      borderColor={borderColor}
      borderWidth={1}>
      <HStack justifyContent="space-between">
        <Badge
          alignSelf="flex-start"
          variant="outline"
          colorScheme={colorScheme}>
          {shareStr}
        </Badge>
        <Text fontSize="xs">{diff}분 전</Text>
      </HStack>

      <HStack alignItems="flex-end" justifyContent="space-between">
        <VStack space={1}>
          <Text>{info}</Text>
          <Text fontSize="lg">{toDecimalString(price)}원</Text>
        </VStack>
        <Button
          variant="outline"
          borderColor="primary.600"
          size="sm"
          onPress={handlePressDetail}>
          자세히
        </Button>
      </HStack>
    </VStack>
  );
};
