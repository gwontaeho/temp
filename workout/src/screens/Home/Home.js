import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button, Input, TextArea, KeyboardAvoidingView} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = () => {
  const headerHeight = useHeaderHeight();

  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{flex: 1, padding: 20}}
      keyboardVerticalOffset={headerHeight}>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Text>asda</Text>
          <Input variant="underlined" />
          <Text>asda</Text>

          <TextArea />
          <Input variant="underlined" />
          <Button>버튼</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
