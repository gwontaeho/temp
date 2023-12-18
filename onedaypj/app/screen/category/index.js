import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from '../../axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';

import styles from './styles';

const Category = props => {
  const [productData, setProductData] = useState([]);
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    requestCategoryData();
    console.log(props);
  }, [sort]);

  const requestCategoryData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product/category?name=${props.route.params.categoryName}&sort=${sort}`,
      );
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [sort]);

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
        <View>
          <Image
            source={{
              uri,
            }}
            style={styles.content_image}
          />
          <View style={[styles.content_view, styles.content_address]}>
            <Icon name="location-outline" color="white" />
            <Text style={[{color: 'white'}, styles.content_text]}>
              {item.address.split('&')[0]}
            </Text>
          </View>
        </View>

        <View style={styles.content_view}>
          <Text style={[styles.content_text, {minHeight: 36}]}>
            {`[${item.category}] ${item.name}`}
          </Text>
        </View>
        <View style={styles.content_view}>
          <Text style={styles.content_text}>{item.price}원</Text>
        </View>
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
        <View>
          <Text>{props.route.params.title}</Text>
        </View>
        <View style={styles.header_space} />
      </View>

      <View style={styles.sort}>
        <TouchableOpacity onPress={() => setSort('rating')}>
          <Text style={styles.sort_text}>평점순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSort('sold')}>
          <Text style={styles.sort_text}>판매순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSort('low')}>
          <Text style={styles.sort_text}>낮은 가격순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSort('high')}>
          <Text style={styles.sort_text}>높은 가격순</Text>
        </TouchableOpacity>
      </View>
      <Divider />

      <View style={styles.contents}>
        <FlatList
          data={productData}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Category;
