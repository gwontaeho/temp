import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';

export const Artists = ({navigation}) => {
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
      <View style={styles.renderItem}>
        <View>
          <Text>아이디</Text>
          <Text>아이디</Text>
          <Text>아이디</Text>
          <Text>아이디</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Artist')}>
          <Text>to Artist</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <View>
        <Text>작가목록</Text>
      </View>
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
  },
  deposit: {
    borderWidth: 1,
    height: 200,
    padding: 20,
    marginBottom: 20,
  },
  history: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
  },
  flatList: {
    marginTop: 20,
  },
  renderItem: {
    borderWidth: 1,
  },
});
