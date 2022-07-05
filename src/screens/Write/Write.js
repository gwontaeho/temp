import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {Button, TextArea, Image, FlatList, View, VStack} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import api from '#api';
import {useSelector} from 'react-redux';

export const Write = ({navigation}) => {
  const screenWidth = Dimensions.get('screen').width;

  const token = useSelector(state => state.token.value);
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

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
    const formData = new FormData();
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices lectus et arcu condimentum tempor. Vestibulum in hendrerit purus, eu.';
    formData.append('text', text);
    images.forEach(image => {
      const file = {
        name: image.fileName,
        uri: image.uri,
      };
      formData.append('images', file);
    });
    try {
      const response = await api.post('post', formData, {
        headers: {
          token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [images, text]);

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
      {Boolean(images.length) ? (
        <FlatList
          horizontal
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          disableIntervalMomentum
          pagingEnabled
          flexGrow={0}
        />
      ) : (
        <View></View>
      )}
      <VStack>
        <Button onPress={handleClickAddImage}>이미지 추가</Button>
        <TextArea
          variant="underlined"
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />
        <Button onPress={handleClickSubmit}>완료</Button>
      </VStack>
    </SafeAreaView>
  );
};
