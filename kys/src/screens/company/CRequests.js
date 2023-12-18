import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Alert} from 'react-native';
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
  Center,
  Input,
  Modal,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

import {getNearbyRequests} from '@apis';
import {AuthContext} from '@contexts';
import {ModalFormFilter} from '@components';
import {RequestCard} from '@components/company';

export const CRequests = () => {
  const {auth, permissions, setAuth} = useContext(AuthContext);

  const {Company} = auth;
  const {expiration, distance, max_count} = Company || {};

  const today = dayjs(auth.date).format('YYYYMMDD');

  const diff = expiration
    ? dayjs(expiration).diff(today) / 1000 / 60 / 60 / 24
    : -1;

  const expired = diff < 0;

  const expirationStr = expired
    ? '만료일이 경과했습니다'
    : dayjs(expiration).format('YY. MM. DD 까지 사용 가능');

  const [sort, setSort] = useState('distance');
  const [filter, setFilter] = useState({time: 0});
  const [type, setType] = useState('all');
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
        distance,
        sort,
        filter,
        type,
      }),
    refetchInterval: wait && 3000,
    enabled: wait && !expired && !!latitude && !!longitude,
    onSuccess: data => {
      const code = data?.code;
      const blocked_t = data?.blocked_t;
      const seq = data?.seq;

      if (code === 100) {
        setWait(false);
      }

      if (code === 110) {
        setWait(false);
        const str = `매칭 취소 대기시간\n${dayjs(blocked_t).format(
          'YYYY.MM.DD HH:mm',
        )}\n\n고의로 반복 취소 시 이용이 정지될 수 있습니다 (${seq}/3)`;
        Alert.alert('', str, [{text: '확인'}]);
      }
    },
  });

  const requests = data?.requests || [];
  const count = data?.count || 0;

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {}, []);

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
          setLocation({
            address: address.replace('대한민국 ', ''),
            latitude,
            longitude,
          });
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
    setType(v.type);
  };

  const handlePressClose = () => {
    setAuth(prev => ({...prev, initSign: false}));
  };

  return (
    <SafeAreaView flex={1}>
      <HStack
        height={100}
        px={5}
        alignItems="center"
        justifyContent="space-between">
        <HStack space={1} alignItems="center">
          <Heading>인근 요청</Heading>
          {wait && <Spinner />}
        </HStack>
        {!expired && (
          <Button
            size="sm"
            isDisabled={!permissions.location || !location.address}
            variant={wait ? 'outline' : 'solid'}
            onPress={() => setWait(prev => !prev)}>
            요청대기
          </Button>
        )}
      </HStack>
      <VStack px={5} pb={5} space={3} alignItems="flex-end">
        <Text underline>{expirationStr}</Text>
        <HStack alignItems="center" space={1}>
          <Icon
            name="location-outline"
            size={16}
            color={
              !permissions.location || !location.address ? '#e11d48' : '#000'
            }
          />
          <Input
            flex={1}
            isReadOnly
            h={10}
            color={
              !permissions.location || !location.address
                ? 'danger.600'
                : 'black'
            }
            value={
              permissions.location
                ? location.address || '위치를 찾을 수 없습니다'
                : '위치 권한을 허용해주세요'
            }
            InputRightElement={
              <Button
                size="sm"
                rounded="none"
                h="full"
                onPress={getCurrentPosition}>
                <Icon name="refresh" size={16} color="#fff" />
              </Button>
            }
          />
        </HStack>
      </VStack>
      <Divider />
      <HStack mx={5} my={3} alignItems="center" justifyContent="flex-end">
        <ModalFormFilter
          onComplete={handleComplete}
          values={{sort, filter, type}}
        />
      </HStack>
      <Divider />
      <View flex={1}>
        {!expired && wait && (
          <FlatList
            data={requests}
            renderItem={({item}) => <RequestCard item={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={<View p={2.5} />}
            _contentContainerStyle={{p: 5}}
          />
        )}
        {!expired && wait && count >= max_count && (
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
        {expired && (
          <Center
            position="absolute"
            w="full"
            h="full"
            bgColor="#0000001A"
            zIndex={9999}>
            <VStack alignItems="center">
              <Text mb={3}>업체등록 문의 : 카카오톡 365homethai</Text>
              <Text>세금계산서 발행을 원하실경우</Text>
              <Text>사업자등록번호와 신분증 사본이 필요합니다</Text>
            </VStack>
          </Center>
        )}
        {!expired && !wait && (
          <Center flex={1}>
            <Text textAlign="center" fontSize="xl" bold>
              요청대기를 누르시면{`\n`}실시간 인근 콜 리스트가 보입니다!
            </Text>
          </Center>
        )}
      </View>

      {/* <Modal isOpen={auth?.initSign}>
        <Modal.Content>
          <Modal.Body>
            <VStack space={3} alignItems="center">
              <Text fontSize="md">
                홈타이 365는 업주님의 실시간 위치를 저장하거나 타 업체, 앱
                사용자에게 제공하지 않습니다
              </Text>
              <Text fontSize="md">
                모든 위치 정보는 대략적인 거리로만 표시됩니다
              </Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack flex={1} justifyContent="center">
              <Button flex={1} onPress={handlePressClose}>
                닫기
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </SafeAreaView>
  );
};
