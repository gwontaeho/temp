import React, {useCallback, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';

import styles from './styles';

const Main = ({navigation}) => {
  const onPressCategory = useCallback(v => {
    navigation.navigate('Category', {
      categoryName: v,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
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
        <View style={styles.popular}>
          <Text>인기 클래스</Text>
        </View>
        <View style={styles.newly}>
          <Text>신규 클래스</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;
