import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, Keyboard} from 'react-native';
import {
  View,
  ScrollView,
  Input,
  Button,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';
import database from '@react-native-firebase/database';

export const Room = ({route, navigation}) => {
  const room = route.params?.room;
  const headerHeight = useHeaderHeight();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const renderItem = ({item}) => {
    return (
      <Text p={5} borderWidth={1}>
        {item.text}
      </Text>
    );
    s;
  };

  useEffect(() => {
    let firstRender = true;
    const ref = database().ref(`/rooms/${room}/messages`);
    const onChildAdd = ref
      .orderByChild('date')
      .limitToLast(1)
      .on('child_added', snapshot => {
        console.log(snapshot);
        if (firstRender) return (firstRender = false);
        setMessages(prev => [snapshot.val(), ...prev]);
      });
    return () => ref.off('child_added', onChildAdd);
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handlePressTest = useCallback(() => {
    const ref = database().ref(`/rooms/${room}/messages`);
    ref.push({text, date: new Date().getTime()});
  }, [text]);

  return (
    <SafeAreaView flex={1}>
      <FlatList
        inverted
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.date}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={headerHeight}>
        <Input
          placeholder="Value Controlled Input"
          rounded="none"
          value={text}
          onChangeText={text => setText(text)}
          InputRightElement={
            <Button rounded="none" onPress={handlePressTest}>
              submit
            </Button>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
