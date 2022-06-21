import React, {useState, useEffect, useCallback} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Input, TextArea, Avatar, Divider} from 'native-base';
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
        const response = await api.get(`post/${id}`);
        setPost(response.data);
        console.log(response.data.images);
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
    return (
      <Image
        source={{uri: item.path}}
        style={{width: screenWidth, aspectRatio: 1}}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}>
      <ScrollView>
        <FlatList
          horizontal
          data={post.images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          disableIntervalMomentum
          pagingEnabled
          // onScroll={handleScroll}
        />
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar style={{marginRight: 10}} />
            <View>
              <Text>닉네임</Text>
              <Text>ㅋㅋ</Text>
            </View>
          </View>
          <Button onPress={handlePressLike}>좋아요</Button>
          <Button>팔로우</Button>
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          <Text>{post.text}</Text>
        </View>
        <Divider />
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          {[0, 1, 2, 3].map(v => (
            <View key={v} style={{flexDirection: 'row', marginBottom: 20}}>
              <Avatar style={{marginRight: 10}} />
              <View style={{flex: 1}}>
                <Text>
                  닉네임 태그 ㄴㅇㅁㄴㅇㅁ암ㄴ암ㄴ ㅇㄴ망ㅁ낭마 ㅇㄴ마아나
                </Text>
                <Text>3시간전 답글쓰기</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Input
        placeholder="Value Controlled Input"
        rounded="none"
        InputRightElement={<Button rounded="none">아아</Button>}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
