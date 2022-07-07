import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {Button, Dimensions, SafeAreaView} from 'react-native';
import {Input, TextArea, Image, FlatList, View, VStack} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '#api';
import {useSelector} from 'react-redux';

export const Write = ({route, navigation}) => {
  const type = route.params?.type;
  const screenWidth = Dimensions.get('screen').width;
  const token = useSelector(state => state.token.value);

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="등록" onPress={handleClickSubmit} />,
    });
  }, [navigation, title, text, images]);

  const handleClickAddImage = useCallback(async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (response.didCancel) return;
      setImages(prev => [...prev, ...response.assets]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickSubmit = useCallback(async () => {
    console.log(text);
    return console.log({title, text, images});

    // const formData = new FormData();
    // const text =
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices lectus et arcu condimentum tempor. Vestibulum in hendrerit purus, eu.';
    // formData.append('text', text);
    // images.forEach(image => {
    //   const file = {
    //     name: image.fileName,
    //     uri: image.uri,
    //   };
    //   formData.append('images', file);
    // });
    // try {
    //   const response = await api.post('post', formData, {
    //     headers: {
    //       token,
    //     },
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  }, [images, title, text]);

  useEffect(() => {
    console.log(images);
    console.log();
  }, [images]);

  const renderItem = ({item}) => (
    <Image
      source={{uri: item.uri}}
      w={screenWidth}
      aspectRatio={1}
      alt="image"
    />
  );
  return (
    <SafeAreaView flex={1}>
      <FlatList
        horizontal
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        flexGrow={0}
      />
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
        <Button title="이미지 등록" />
      </VStack>
    </SafeAreaView>
  );
};
