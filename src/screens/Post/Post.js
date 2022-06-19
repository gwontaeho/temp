import React, {useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button, Input, TextArea} from 'native-base';

import api from '#api';

export const Post = ({navigation, route}) => {
  const id = route.params.id;
  const [post, setPost] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`post/${id}`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {}
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, borderWidth: 1, justifyContent: 'flex-end'}}>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
          <Text>asdasd</Text>

          <Text>asdasd</Text>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
          <Text>asdasd</Text>

          <Text>asdasd</Text>

          <Text>asdasd</Text>
          <Text>asdasd</Text>
          <Input variant="underlined" />
          <Text>asdasd</Text>
          <TextArea />
          <Text>asdasd</Text>
          <Input variant="underlined" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
