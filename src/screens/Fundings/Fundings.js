import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {Progress} from 'native-base';

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
      <Pressable
        style={styles.renderItem}
        onPress={() => navigation.navigate('Funding')}>
        <ImageBackground
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.imageBackground}>
          <View style={styles.progressContainer}>
            <View style={styles.progressText}>
              <Text>39.5% 모집</Text>
              <Text>145명 참여</Text>
            </View>
            <Progress value={45} />
          </View>
        </ImageBackground>
        <View style={styles.fundingText}>
          <Text>펀드이름</Text>
          <Text>작가</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  renderItem: {
    paddingBottom: 20,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 4 / 3,
    justifyContent: 'flex-end',
  },
  progressContainer: {
    padding: 20,
  },
  progressText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fundingText: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
