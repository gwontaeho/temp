import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, FlatList, View, Image} from 'react-native';
import {Button, TextArea} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import {Spacer} from '#components';
import api from '#api';

const windowWidth = Dimensions.get('window').width;

export const Write = ({navigation}) => {
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
      const response = await api.post('post', formData);
    } catch (error) {
      console.log(error);
    }
  }, [images, text]);

  useEffect(() => {
    console.log(images);
    console.log();
  }, [images]);

  const renderItem = ({item}) => (
    <View>
      <Image source={{uri: item.uri}} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {Boolean(images.length) ? (
        <FlatList
          style={styles.flatList}
          snapToInterval={windowWidth}
          data={images}
          keyExtractor={item => item.fileName}
          renderItem={renderItem}
          horizontal
        />
      ) : (
        <View style={styles.image}></View>
      )}
      <View style={styles.contents}>
        <View>
          <Button onPress={handleClickAddImage}>이미지 추가</Button>
          <Spacer _m={30} />
          <TextArea
            variant="underlined"
            value={text}
            onChange={e => setText(e.currentTarget.value)}
          />
        </View>
        <Button onPress={handleClickSubmit}>완료</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
  },
  h1: {
    fontSize: 30,
  },
  flatList: {
    flexGrow: 0,
  },
  image: {
    width: windowWidth,
    height: windowWidth,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});
