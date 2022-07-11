import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {Dimensions, SafeAreaView, Button} from 'react-native';
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

export const Board = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="write"
          onPress={() => navigation.navigate('Write', {type: 'B'})}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get('post/?type=B');
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
    console.log('as');
  }, []);

  const renderItem = ({item}) => {
    const {id, title} = item;

    return (
      <VStack space={2.5} py={5} key={id}>
        <HStack>
          <Text numberOfLines={2} flex={1} fontSize="md">
            {title}
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
