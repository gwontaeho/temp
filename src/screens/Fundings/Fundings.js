import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Progress, Text, FlatList, Flex, Pressable} from 'native-base';

export const Fundings = ({navigation}) => {
  const data = [
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

  const renderItem = ({item}) => {
    const {id, text} = item;

    return (
      <Pressable onPress={() => navigation.navigate('Funding')}>
        <ImageBackground
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.imageBackground}>
          <Flex p={3}>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              mb={3}
              mx={1}>
              <Text color="#fff" fontSize="md" bold>
                39.5% 모집
              </Text>
              <Text color="#fff">145명 참여</Text>
            </Flex>
            <Progress value={45} />
          </Flex>
        </ImageBackground>
        <Flex mx={1}>
          <Text bold fontSize="md" my={1}>
            펀드이름
          </Text>
          <Text>작가</Text>
        </Flex>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      _contentContainerStyle={{p: 7}}
      ItemSeparatorComponent={() => <Flex m={3.5} />}
    />
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    aspectRatio: 4 / 3,
    justifyContent: 'flex-end',
  },
});
