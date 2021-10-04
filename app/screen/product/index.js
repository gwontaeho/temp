import React, {useState, useCallback, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import axios from '../../axios';

import styles from './styles';

import Detail from './detail';
import Review from './review';
import Qna from './qna';

const Product = props => {
  const [data, setData] = useState({});

  let scrollViewRef = useRef();

  useEffect(() => {
    console.log(props.route.params.id);
    requestData();
  }, []);

  const requestData = useCallback(async () => {
    try {
      const response = await axios.post('/api/classes/product', {
        id: props.route.params.id,
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const category = useCallback(v => {
    switch (v) {
      case 'all':
        return '[전체] ';
      case 'flower':
        return '[플라워] ';
      case 'art':
        return '[미술] ';
      case 'cooking':
        return '[요리] ';
      case 'handmade':
        return '[수공예] ';
      case 'activity':
        return '[액티비티] ';
      case 'etc':
        return '[기타] ';
    }
  }, []);

  return Object.keys(data).length === 0 ? null : (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_space}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header_space}>
          <TouchableOpacity
            onPress={() => scrollViewRef.current.scrollTo({y: 0})}>
            <Text>위로</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView ref={scrollViewRef}>
        <Image
          source={{
            uri:
              'http://172.30.1.27:3005' +
              data.img.replace(/\\/gi, '/').replace(/public/gi, ''),
          }}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text>{category(data.category) + data.name}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Product;
