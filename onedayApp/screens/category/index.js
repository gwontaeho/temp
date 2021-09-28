import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from '../../axios';

import styles from './styles';

const Category = props => {
  const {categoryName} = props.route.params;
  const {navigation} = props;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/category', {
          sort: 'rating',
          category: categoryName,
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [categoryName]);

  const onPressSort = useCallback(
    async v => {
      console.log(v);
      try {
        const response = await axios.post('/api/category', {
          category: categoryName,
          sort: v,
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [categoryName],
  );

  const onPressContent = useCallback(
    v => {
      navigation.navigate('Product', {
        id: v.id,
      });
    },
    [navigation],
  );

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
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        </View>
        <Text>
          {categoryName === 'all'
            ? '전체'
            : categoryName === 'flower'
            ? '플라워'
            : categoryName === 'art'
            ? '미술'
            : categoryName === 'cooking'
            ? '요리'
            : categoryName === 'handmade'
            ? '수공예'
            : categoryName === 'activity'
            ? '액티비티'
            : '기타'}
        </Text>
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
