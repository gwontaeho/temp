import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Heading,
  HStack,
  FlatList,
  View,
  Spinner,
  Divider,
  Badge,
  Center,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {getNearbyRequests} from '@apis';
import {AuthContext} from '@contexts';
import dayjs from 'dayjs';
import {ModalFormFilter} from '@components';

export const CRequests = ({navigation}) => {
  const {auth} = useContext(AuthContext);

  const {Company} = auth;
  const {expiration, distance, max_count} = Company || {};

  const today = dayjs(dayjs().format('YYYYMMDD'));
  const diff = expiration
    ? dayjs(expiration).diff(today) / 1000 / 60 / 60 / 24
    : -1;

  const expired = diff < 0;

  const expirationStr = expired
    ? '만료일이 경과했습니다'
    : dayjs(expiration).format('YY. MM. DD 까지 사용 가능');

  const [sort, setSort] = useState('distance');
  const [filter, setFilter] = useState({time: 0});
  const [wait, setWait] = useState(false);
  const [location, setLocation] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
  });
  const {latitude, longitude} = location;

  const {data} = useQuery({
    queryKey: ['CRequests'],
    queryFn: () =>
      getNearbyRequests({
        TargetId: auth.id,
        latitude,
        longitude,
        distance: 1000000,
        sort,
        filter,
      }),
    refetchInterval: wait && 2000,
    enabled: !expired && !!latitude && !!longitude,
  });

  const requests = data?.requests || [];
  const count = data?.count || 0;

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const key = 'AIzaSyCkSBVah-2JTELaurbDImw32xidwTLY6CE';
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${key}`,
          );
          const {formatted_address: address} = response.data.results[0];
          setLocation({address, latitude, longitude});
        } catch (error) {
          console.log(error);
        }
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  const handleComplete = v => {
    setSort(v.sort);
    setFilter(prev => ({...prev, ...v.filter}));
  };

  const renderItem = ({item}) => {
    const {status, category, time, personnel, distance, share, price} = item;
    const d = (distance / 1000).toFixed(1);

    const shareStr = share ? '업체 공유' : '사용자 요청';
    const borderColor = share ? 'secondary.600' : 'primary.600';
    const colorScheme = share ? 'secondary' : 'primary';

    const handlePressDetail = () => {
      navigation.navigate('CRequest', item);
    };

    return (
      <VStack
        p={3}
        justifyContent="space-between"
        rounded="sm"
        space={3}
        borderColor={borderColor}
        borderWidth={1}>
        <Badge
          alignSelf="flex-start"
          variant="outline"
          colorScheme={colorScheme}>
          {shareStr}
        </Badge>

        <Text>{`${category} · ${time}분 · ${personnel}인 · ${d}km`}</Text>
        <HStack alignItems="center" justifyContent="flex-end">
          <Text fontSize="lg">{price}원</Text>
        </HStack>
        <Button variant="outline" size="sm" onPress={handlePressDetail}>
          자세히
        </Button>
      </VStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        height={120}
        px={10}
        alignItems="center"
        justifyContent="space-between">
        <HStack space={1} alignItems="center">
          <Heading>인근 요청</Heading>
          {wait && <Spinner />}
        </HStack>
        {!expired && (
          <Button
            size="sm"
            variant={wait ? 'outline' : 'solid'}
            onPress={() => setWait(prev => !prev)}>
            요청대기
          </Button>
        )}
      </HStack>
      <VStack px={10} pb={5} alignItems="flex-end">
        <Text color="gray.600" underline>
          {expirationStr}
        </Text>
        <Text color="gray.600" bold>
          {location.address || '위치를 찾을 수 없습니다'}
        </Text>
      </VStack>
      <Divider />
      <HStack mx={5} my={3} alignItems="center" justifyContent="flex-end">
        <ModalFormFilter onComplete={handleComplete} values={{sort, filter}} />
      </HStack>
      <Divider />
      <View flex={1}>
        {!expired && (
          <FlatList
            data={requests}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={<View p={2.5} />}
            _contentContainerStyle={{p: 5}}
          />
        )}
        {count >= max_count && (
          <Center
            position="absolute"
            w="full"
            h="full"
            bgColor="#0000001A"
            zIndex={9999}>
            <Text fontSize="3xl">{`${count} / ${max_count}`}</Text>
            <Text fontSize="xl">진행중인 콜을 먼저 완료해주세요</Text>
          </Center>
        )}
      </View>
    </SafeAreaView>
  );
};
