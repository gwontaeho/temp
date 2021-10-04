import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from '../../axios';

import styles from './styles';

const Category = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    requestCategoryData();
  }, []);

  const requestCategoryData = useCallback(async () => {
    try {
      const response = await axios.post('/api/category', {
        sort: 'rating',
        category: props.route.params.categoryName,
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPressSort = useCallback(async v => {
    console.log(v);
    try {
      const response = await axios.post('/api/category', {
        category: props.route.params.categoryName.categoryName,
        sort: v,
      });
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPressContent = useCallback(v => {
    props.navigation.navigate('Product', {
      id: v.id,
    });
  }, []);

  const renderItem = ({item}) => {
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
          style={styles.content_image}
        />
        <Text style={[styles.content_text, styles.content_address]}>
          {item.address.split('&')[0]}
        </Text>
        <Text style={styles.content_text}>{item.name}</Text>
        <Text style={styles.content_text}>{item.price}원</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_space}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text>
            {props.route.params.categoryName === 'all'
              ? '전체'
              : props.route.params.categoryName === 'flower'
              ? '플라워'
              : props.route.params.categoryName === 'art'
              ? '미술'
              : props.route.params.categoryName === 'cooking'
              ? '요리'
              : props.route.params.categoryName === 'handmade'
              ? '수공예'
              : props.route.params.categoryName === 'activity'
              ? '액티비티'
              : '기타'}
          </Text>
        </TouchableOpacity>
        <View style={styles.header_space} />
      </View>

      <View style={styles.sort}>
        <TouchableOpacity onPress={() => onPressSort('rating')}>
          <Text style={styles.sort_text}>평점순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressSort('sold')}>
          <Text style={styles.sort_text}>판매순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressSort('lowPrice')}>
          <Text style={styles.sort_text}>낮은 가격순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressSort('highPrice')}>
          <Text style={styles.sort_text}>높은 가격순</Text>
        </TouchableOpacity>
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
