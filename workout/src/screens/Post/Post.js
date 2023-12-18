import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
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
  HStack,
} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';

import api from '#api';

export const Post = ({navigation, route}) => {
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
      console.log(response);
    } catch (error) {}
  }, []);

  const handlePressLike = useCallback(async () => {
    try {
      const response = await api.get(`like/?PostId=${1}`);
    } catch (error) {}
  }, []);

  const renderItem = ({item}) => {
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
      <SafeAreaView flex={1}>
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
              <HStack space={2.5} alignItems="center">
                <Avatar />
                <Text bold>아나나오이이</Text>
              </HStack>
              <HStack alignItems="center">
                <Button variant="link">follow</Button>
                <Button variant="link" onPress={handlePressLike}>
                  like
                </Button>
              </HStack>
            </Flex>
            <Text>{post.text}</Text>
            <Divider />
            <VStack space={5}>
              {[0, 1, 2, 3].map(v => (
                <HStack key={v} space={2.5}>
                  <Avatar />
                  <VStack flex={1} space={2.5}>
                    <Text>
                      <Text bold>닉네임&nbsp;</Text>
                      <Text color="blue.900">@태그</Text>
                      <Text>ㄴㅇㅁㄴㅇㅁ암ㄴ암ㄴ ㅇㄴ망ㅁ낭마 ㅇㄴ마아나</Text>
                    </Text>
                    <Text>3시간전 답글쓰기</Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </ScrollView>
        <Input
          placeholder="Value Controlled Input"
          rounded="none"
          InputRightElement={<Button rounded="none">submit</Button>}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
