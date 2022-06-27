import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, FlatList, Image, Pressable, HStack, Avatar} from 'native-base';
import api from '#api';

export const Feed = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get('post');
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  }, []);

  const renderItem = ({item}) => {
    const {id, text, user, images} = item;
    console.log(item);

    return (
      <Pressable
        onPress={() => navigation.navigate('Post', {id})}
        flex={1 / 2}
        m={1}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          alt="image"
          width="full"
          aspectRatio={1}
          borderRadius="md"
        />
        <HStack space={2} p={2} alignItems="center">
          <Avatar size="xs" />
          <Text>닉네임</Text>
        </HStack>
        <Text numberOfLines={2} px={2}>
          {text}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      flex={1}
      p={1}
    />
  );
};
