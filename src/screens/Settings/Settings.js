import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Text,
  Pressable,
  HStack,
  FlatList,
  Image,
  VStack,
  Button,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '#redux/features/token/tokenSlice';

export const Settings = ({navigation}) => {
  const token = useSelector(state => state.token.value);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

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
  ]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        // try {
        //   const keys = await AsyncStorage.getAllKeys();
        //   await AsyncStorage.clear();
        //   console.log(keys);
        //   const jsonValue = await AsyncStorage.getItem('token');
        //   console.log(jsonValue);
        // } catch (error) {}
        console.log(token);
      };
      getData();
    }, [token]),
  );

  const handlePressSignout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(setToken(''));
    } catch (error) {}
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
        flex={1}
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
        // onRefresh={handleRefresh}
        // refreshing={refreshing}
        _contentContainerStyle={{p: 1}}
        ListHeaderComponent={
          <VStack m={1} space={2}>
            <HStack space={2}>
              <Image
                source={{uri: 'https://picsum.photos/200'}}
                alt="image"
                flex={1}
                aspectRatio={1}
              />
              <VStack flex={1} alignItems="center" justifyContent="center">
                <Text>김민성</Text>
                <Text onPress={() => navigation.navigate('Sign')}>
                  follower: 4
                </Text>
                <Text>following: 20</Text>
              </VStack>
            </HStack>
            <HStack justifyContent="space-evenly">
              <Button flex={1} variant="link">
                feed
              </Button>
              <Button flex={1} variant="link">
                qna
              </Button>
            </HStack>
          </VStack>
        }
      />
    </SafeAreaView>
  );
};
