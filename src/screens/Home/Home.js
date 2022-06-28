import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {
  VStack,
  ScrollView,
  Image,
  FlatList,
  useToast,
  View,
  Text,
  Center,
  Flex,
  Button,
} from 'native-base';
import Toast from 'react-native-toast-message';

export const Home = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const toast = useToast();
  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    console.log(page);
  }, [page]);

  const showToast = () => {
    Toast.show({
      type: 'custom',
      text1: 'Hello',
      text2: 'This is some something 👋',
      position: 'bottom',
    });
  };

  const showBaseToast = () => {
    toast.show({
      description: 'Hello world',
    });
  };

  const DATA = [
    {
      id: 1,
      text: '1',
    },
    {
      id: 2,
      text: '2',
    },
    {
      id: 3,
      text: '3',
    },
  ];

  const handleScroll = useCallback(e => {
    setPage(
      Math.round(
        e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width,
      ),
    );
  }, []);

  const renderItem = () => {
    return (
      <Image
        source={{uri: 'https://picsum.photos/200'}}
        w={screenWidth}
        aspectRatio={1}
        alt="image"
      />
    );
  };

  const renderItem2 = () => {
    return (
      <Image
        source={{uri: 'https://picsum.photos/200'}}
        w={screenWidth / 2}
        aspectRatio={1}
        alt="image"
      />
    );
  };

  return (
    <ScrollView bg="#fff">
      <VStack>
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          disableIntervalMomentum
          pagingEnabled
          onScroll={handleScroll}
          mb={10}
        />
        <Flex direction="row" justify="space-between" mx={5} mb={5}>
          <Text>펀딩 NOW</Text>
          <Text>전체보기</Text>
        </Flex>
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem2}
          keyExtractor={item => item.id}
          onScroll={handleScroll}
          _contentContainerStyle={{px: 5}}
          ItemSeparatorComponent={() => <View m={2.5} />}
          ListFooterComponent={() => (
            <Center bg="#eee" flex={1} ml={5} w={100} borderRadius="md">
              <Text>더보기</Text>
            </Center>
          )}
        />
        <Button m={5}>펀딩 전체보기</Button>
      </VStack>
    </ScrollView>
  );
};
