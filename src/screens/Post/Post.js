import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {
  Button,
  Input,
  Avatar,
  Text,
  FlatList,
  Divider,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  Flex,
  VStack,
} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';

import api from '#api';

export const Post = ({navigation, route}) => {
  const token = useSelector(state => state.token.value);
  const id = route.params.id;
  const screenWidth = Dimensions.get('screen').width;
  const headerHeight = useHeaderHeight();

  const [post, setPost] = useState({});

  useEffect(() => {
    (async () => {
      try {
        console.log(id);
        const response = await api.get(`post/${id}`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {}
    })();
  }, [id]);

  const handlePressCreateComment = useCallback(async () => {
    try {
      const response = await api.post('comment');
    } catch (error) {}
  }, []);

  const handlePressLike = useCallback(async () => {
    try {
      const response = await api.get(`like/?PostId=${1}`, {headers: {token}});
    } catch (error) {}
  }, [token]);

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <Image
        source={{uri: item.path}}
        w={screenWidth}
        aspectRatio={1}
        alt="image"
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      flex={1}
      keyboardVerticalOffset={headerHeight}>
      <ScrollView>
        <FlatList
          horizontal
          data={post.Images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          disableIntervalMomentum
          pagingEnabled
        />
        <VStack p={5} space={5}>
          <Flex direction="row" justify="space-between">
            <Flex direction="row" align="center">
              <Avatar mr={2.5} />
              <View>
                <Text>닉네임</Text>
                <Text>ㅋㅋ</Text>
              </View>
            </Flex>
            <Button onPress={handlePressLike}>좋아요</Button>
            <Button>팔로우</Button>
          </Flex>
          <Text>{post.text}</Text>
          <Divider />
          <VStack space={5}>
            {[0, 1, 2, 3].map(v => (
              <Flex key={v} direction="row">
                <Avatar mr={2.5} />
                <Flex flex={1}>
                  <Text>
                    <Text bold>닉네임&nbsp;</Text>
                    <Text>태그</Text>ㄴㅇㅁㄴㅇㅁ암ㄴ암ㄴ ㅇㄴ망ㅁ낭마
                    ㅇㄴ마아나
                  </Text>
                  <Text mt={2.5}>3시간전 답글쓰기</Text>
                </Flex>
              </Flex>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
      <Input
        placeholder="Value Controlled Input"
        rounded="none"
        InputRightElement={<Button rounded="none">아아</Button>}
      />
    </KeyboardAvoidingView>
  );
};
