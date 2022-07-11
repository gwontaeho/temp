import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {Image, FlatList, VStack, HStack, Button, Flex} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';

export const Write_Image = ({route, navigation}) => {
  const {type} = route.params;
  const screenWidth = Dimensions.get('screen').width;

  const [images, setImages] = useState([]);
  const [aspectRatio, setAspectRatio] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="unstyled"
          onPress={() => navigation.navigate('Write_Text', {type, images})}>
          다음
        </Button>
      ),
    });
  }, [navigation, images]);

  const handleClickAddImage = useCallback(async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
      });
      console.log(response);
      if (response.didCancel) return;
      const assets = response.assets;
      assets.forEach(
        (asset, i) => (asset['key'] = `${new Date().getTime()}_${i}`),
      );
      setImages(prev => [...prev, ...assets]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(images);
    console.log();
  }, [images]);

  const renderItem = ({item}) => (
    <Image
      source={{uri: item.uri}}
      w={screenWidth}
      aspectRatio={aspectRatio}
      alt="image"
    />
  );
  return (
    <SafeAreaView flex={1} justifyContent="space-between">
      <FlatList
        horizontal
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        flexGrow={0}
        disableIntervalMomentum
        pagingEnabled
      />
      <VStack space={5}>
        <Flex direction="row" justify="space-evenly">
          <Button variant="unstyled" onPress={() => setAspectRatio(1)}>
            1:1
          </Button>
          <Button variant="unstyled" onPress={() => setAspectRatio(3 / 4)}>
            3:4
          </Button>
          <Button variant="unstyled" onPress={() => setAspectRatio(4 / 3)}>
            4:3
          </Button>
        </Flex>
        <Button onPress={handleClickAddImage}>이미지 추가</Button>
      </VStack>
    </SafeAreaView>
  );
};
