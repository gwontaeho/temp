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
      <Text key={item} p={5} borderWidth={1}>
        {item}
      </Text>
    );
    s;
  };

  useEffect(() => {
    const ref = database().ref(`/rooms/${room}/messages`);
    const onValueChange = ref.orderByChild('date').on('value', snapshot => {
      snapshot.forEach(v => console.log(v.val()));
      if (snapshot.val()) console.log(Object.values(snapshot.val()));
    });
    return () => ref.off('value', onValueChange);
  }, []);

  const handlePressTest = useCallback(() => {
    const ref = database().ref(`/rooms/${room}/messages`);
    ref.push({text, date: new Date().getTime()});
  }, [text]);

  return (
    <SafeAreaView flex={1}>
      <FlatList
        inverted
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
