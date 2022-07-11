import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import storage from '@react-native-firebase/storage';
import {Button, Dimensions, SafeAreaView} from 'react-native';
import {Input, TextArea, Image, FlatList, VStack} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '#api';

export const Write_Text = ({route, navigation}) => {
  const {type, images} = route.params;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="등록" onPress={handleClickSubmit} />,
    });
  }, [navigation, images]);

  const handleClickSubmit = useCallback(async () => {
    try {
      const references = images.map(image =>
        storage().ref(`${image.key}`).putFile(image.uri),
      );
      const results = await Promise.all(references);
      const urls = results.map(result =>
        storage().ref(result.metadata.fullPath).getDownloadURL(),
      );
      const paths = await Promise.all(urls);
      const response = await api.post('post', {type, title, text, paths});
    } catch (error) {
      console.log(error);
    }
  }, [images, title, text]);

  return (
    <VStack p={5} space={10}>
      {type === 'B' && (
        <Input
          size="lg"
          variant="underlined"
          value={title}
          onChangeText={v => setTitle(v)}
          placeholder="title..."
        />
      )}
      <TextArea
        size="lg"
        variant="underlined"
        value={text}
        onChangeText={v => setText(v)}
        placeholder="text..."
      />
    </VStack>
  );
};
