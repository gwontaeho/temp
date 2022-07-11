import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView, Button} from 'react-native';
import {FlatList, Image, Pressable} from 'native-base';
import api from '#api';

export const Feed = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="write"
          onPress={() => navigation.navigate('Write_Image', {type: 'F'})}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get('post?type=F');
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
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView flex={1}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        _contentContainerStyle={{p: 1}}
      />
    </SafeAreaView>
  );
};
