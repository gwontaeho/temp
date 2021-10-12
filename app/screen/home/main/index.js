import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import axios from '../../../axios';
import SplashScreen from 'react-native-splash-screen';

import styles from './styles';

const Main = props => {
  const [popClass, setPopClass] = useState([]);
  const [newClass, setNewClass] = useState([]);

  useEffect(() => {
    requestProductData();
  }, []);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get('/api/product/main');
      console.log(response.data);
      setPopClass(response.data.popProduct);
      setNewClass(response.data.newProduct);
    } catch (error) {
      console.log(error);
    }
    SplashScreen.hide();
  }, []);

  const onPressCategory = useCallback(
    v => {
      props.navigation.navigate('Category', {
        categoryName: v,
      });
    },
    [props.navigation],
  );

  const onPressProduct = useCallback(v => {
    props.navigation.navigate('Product', {
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
        onPress={() => onPressProduct(item)}>
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
        <Text>로고</Text>
      </View>

      <ScrollView>
        <View style={styles.banner}>
          <Text>광고ㅇ창</Text>
        </View>

        <View style={styles.categories}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('all')}>
              <Text>전체</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('flower')}>
              <Text>플라워</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('art')}>
              <Text>미술</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('cooking')}>
              <Text>요리</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('handmade')}>
              <Text>수공예</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('activity')}>
              <Text>액티비티</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => onPressCategory('etc')}>
              <Text>기타</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.classList}>
          <View style={styles.title}>
            <Text>인기 클래스</Text>
          </View>
          <View style={styles.list}>
            <FlatList
              data={popClass}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View style={styles.classList}>
          <View style={styles.title}>
            <Text>신규 클래스</Text>
          </View>
          <View style={styles.list}>
            <FlatList
              data={newClass}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;
