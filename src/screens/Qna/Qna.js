import React, {useState, useCallback, useEffect} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {
  VStack,
  FlatList,
  Text,
  HStack,
  View,
  Image,
  Avatar,
  Divider,
  Flex,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import api from '#api';

export const Qna = ({navigation}) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: 'asqwdqwdd',
    },
    {
      id: 2,
      text: 'asdaqwdq dw qwd wqdwdqwsd',
    },
    {
      id: 3,
      text: 'asdasd',
    },
    {
      id: 4,
      text: 'asdasd',
    },
    {
      id: 5,
      text: 'asdasd',
    },
    {
      id: 6,
      text: 'asdasd',
    },
    {
      id: 7,
      text: 'asdasd',
    },
    {
      id: 8,
      text: 'asdasd',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    console.log('as');
  }, []);

  const renderItem = ({item}) => {
    const {id, text} = item;

    return (
      <VStack space={2.5} py={5}>
        <HStack>
          <Text numberOfLines={2} flex={1}>
            FlatList는 항목, 여러 열, 무한 스크롤 로드 또는 기본적으로 지원하는
            기타 기능 간의 구분 기호를 렌더링하려는 경우에도 유용합니다.
          </Text>
        </HStack>
        <Flex direction="row" align="center" justify="space-between">
          <HStack alignItems="center" space={2.5}>
            <Avatar size="sm" />
            <Text>김민성</Text>
          </HStack>
          <Text fontSize="xs">3시간전</Text>
        </Flex>
      </VStack>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ItemSeparatorComponent={() => <Divider />}
        _contentContainerStyle={{px: 5}}
      />
    </SafeAreaView>
  );
};
