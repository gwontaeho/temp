import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Dimensions, Animated} from 'react-native';
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
  Box,
} from 'native-base';
import {ImageLoader} from '#components/ImageLoader';

export const Home = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    console.log(page);
  }, [page]);

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
      <ImageLoader
        source={{uri: 'https://picsum.photos/1000'}}
        alt="image"
        style={{
          width: screenWidth,
          aspectRatio: 1,
        }}
      />
    );
  };

  const renderItem2 = () => {
    return (
      <ImageLoader
        source={{uri: 'https://picsum.photos/1000'}}
        alt="image"
        style={{
          width: screenWidth / 2,
          aspectRatio: 1,
        }}
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
