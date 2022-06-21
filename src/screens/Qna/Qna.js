import React, {useState, useCallback, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import api from '#api';

export const Qna = ({navigation}) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: 'asqwdqwdd',
    },
    {
      id: 2,
      text: 'asdaqwdq dw qwd wqdwdqwsd',
    },
    {
      id: 3,
      text: 'asdasd',
    },
    {
      id: 4,
      text: 'asdasd',
    },
    {
      id: 5,
      text: 'asdasd',
    },
    {
      id: 6,
      text: 'asdasd',
    },
    {
      id: 7,
      text: 'asdasd',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    console.log('as');
  }, []);

  const renderItem = ({item}) => {
    const {id, text} = item;
    const image = item.Images?.[0];

    return (
      <View style={styles.renderItem}>
        <Image
          source={{uri: 'https://picsum.photos/200'}}
          style={styles.image}
        />
        <View style={styles.user}>
          <Text>아이디</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Post', {id})}>
            <Text>asd</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{paddingBottom: 5}}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{paddingTop: 5}}
        style={styles.flatList}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 5,
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
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  renderItem: {
    flex: 1,
    padding: 5,
  },
});
