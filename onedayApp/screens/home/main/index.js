import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';

import styles from './styles';

const Main = ({navigation}) => {
  const [popular, setPopular] = useState([]);
  const [newly, setNewly] = useState([]);

  const onPressCategory = useCallback(v => {
    navigation.navigate('Category', {
      categoryName: v,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://172.30.1.27:3005/api/classes/popular',
          {},
        );

        let popular0 = [...response.data.rows];
        popular0.sort((a, b) => {
          return b.reservations.length - a.reservations.length;
        });
        popular0 = popular0.slice(0, 5);
        console.log(popular0);
        let newly0 = [...response.data.rows];
        newly0.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        newly0 = newly0.slice(0, 5);
        console.log(newly0);

        setPopular(popular0);
        setNewly(newly0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    console.log(item);
    const uri =
      'http://172.30.1.27:3005' +
      item.img.replace(/\\/gi, '/').replace(/public/gi, '');
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => console.log(item)}>
        <Image
          source={{
            uri,
          }}
          style={styles.image}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>로고</Text>
      </View>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.banner}>
          <Text>광고창</Text>
        </View>
        <View style={styles.categories}>
          <View style={styles.category}>
            <TouchableOpacity onPress={() => onPressCategory('flower')}>
              <Text>플라워</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <TouchableOpacity onPress={() => onPressCategory('cooking')}>
              <Text>요리</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <TouchableOpacity onPress={() => onPressCategory('art')}>
              <Text>미술</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <TouchableOpacity onPress={() => onPressCategory('etc')}>
              <Text>기타</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.category}>
            <TouchableOpacity onPress={() => onPressCategory('all')}>
              <Text>전체</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.classList}>
          <View style={styles.title}>
            <Text>인기 클래스</Text>
          </View>
          <View style={styles.list}>
            <FlatList
              data={popular}
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
              data={newly}
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
