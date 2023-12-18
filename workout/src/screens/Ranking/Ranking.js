import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// 유저 랭킹

export const Ranking = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      nickname: 'asdasd',
    },
    {
      id: 2,
      nickname: 'asdasd',
    },
    {
      id: 3,
      nickname: 'asdasd',
    },
    {
      id: 4,
      nickname: 'asdasd',
    },
  ]);

  const renderItem = ({item}) => {
    const {id, nickname} = item;

    return (
      <View style={styles.renderItem}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.image}
        />
        <View style={styles.user}>
          <Text>아이디</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Post', {id})
            }></TouchableOpacity>
        </View>

        <Text style={styles.text} numberOfLines={1}>
          {nickname}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  renderItem: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },
  user: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
