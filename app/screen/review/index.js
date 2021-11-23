import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from '../../axios';
import styles from './styles';

const Review = props => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    requestReviewData();
  }, []);

  const requestReviewData = useCallback(async () => {
    try {
      const response = await axios.get('/api/review', {
        headers: {
          token: props.route.params.token,
        },
      });
      setReviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.list_item_text}>
          <Text style={styles.text}>
            {item.createdAt.substr(0, 4) +
              '.' +
              item.createdAt.substr(5, 2) +
              '.' +
              item.createdAt.substr(8, 2)}
          </Text>
        </View>
        <View style={styles.list_item_text}>
          <Text
            style={
              styles.text
            }>{`[${item.product.category}] ${item.product.name}`}</Text>
        </View>
        <View>
          <Text style={styles.text}>
            <Icon name="star-outline" size={10} color="black" />
            {` ${item.rating}`}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>후기 내역</Text>
      </View>
      <Divider />
      <View style={styles.header}>
        <Text style={styles.header_text}>총 {reviewData.length}건</Text>
      </View>
      <Divider />
      <View style={styles.list}>
        <FlatList
          data={reviewData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Review;
