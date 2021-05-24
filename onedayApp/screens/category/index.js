import React, {useEffect} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

import styles from './styles';
import {useState} from 'react';
import {useCallback} from 'react';

const Category = ({route, navigation}) => {
  const {categoryName} = route.params;

  const [products, setProducts] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.post(
        'http://172.30.1.27:3005/api/category',
        {},
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log(categoryName);
  }, []);

  const onPressContent = useCallback(v => {
    navigation.navigate('Product', {
      id: v.id,
    });
  }, []);

  const renderItem = ({item}) => {
    console.log(item);
    const uri =
      'http://172.30.1.27:3005' +
      item.img.replace(/\\/gi, '/').replace(/public/gi, '');
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPressContent(item)}>
        <Image
          source={{
            uri,
          }}
          style={styles.image}
        />
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>전체</Text>
      </View>
      <View style={styles.contents}>
        <FlatList
          data={products}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Category;
