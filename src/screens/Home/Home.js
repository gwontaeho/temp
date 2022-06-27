import {useFocusEffect} from '@react-navigation/native';
import {Button, Input, useToast} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Toast from 'react-native-toast-message';

export const Home = ({navigation, route}) => {
  const screenWidth = Dimensions.get('screen').width;
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const toast = useToast();
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
    {
      id: 4,
      text: '3',
    },
    {
      id: 5,
      text: '3',
    },
    {
      id: 6,
      text: '3',
    },
    {
      id: 7,
      text: '3',
    },
  ];

  const renderItem = () => {
    return (
      <Image
        source={{uri: 'https://picsum.photos/200'}}
        style={{height: 300, width: screenWidth}}
      />
    );
  };

  const handleScroll = useCallback(e => {
    setPage(
      Math.round(
        e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width,
      ),
    );
  }, []);

  return (
    <View>
      <FlatList
        horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        disableIntervalMomentum
        pagingEnabled
        onScroll={handleScroll}
      />

      <View>
        <Text>homㅁㄴㅇe</Text>

        <Pressable onPress={() => showBaseToast()}>
          <Text>토스트</Text>
        </Pressable>
      </View>
      <Input />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
