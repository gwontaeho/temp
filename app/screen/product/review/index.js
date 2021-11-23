import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Image} from 'react-native';
import axios from '../../../axios';
import Profile from '../../../image/profile/profile.png';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const Review = props => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    requestReviewData();
  }, []);

  const requestReviewData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/review/${props.productId}}`);
      setReviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const dataList = reviewData.map(v => {
    return (
      <View key={v.id} style={styles.data}>
        <View style={styles.img_container}>
          <Image
            source={
              v.user.img === null
                ? Profile
                : {
                    uri:
                      'http://172.30.1.27:3005' +
                      v.user.img.replace(/\\/gi, '/').replace(/public/gi, ''),
                  }
            }
            style={styles.img}
          />
        </View>
        <View>
          <Text style={styles.review_text}>{v.userId}</Text>
          <Text style={styles.review_text}>{v.createdAt.substr(0, 10)}</Text>
          <Text style={styles.review_text}>
            <Icon name="star-outline" size={10} color="black" />
            {` ${v.rating}`}
          </Text>
          <Text style={styles.review_text}>{v.text}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.datas}>
      <View>
        {reviewData.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.empty_text}>등록된 후기가 없습니다</Text>
          </View>
        ) : (
          dataList
        )}
      </View>
    </View>
  );
};

export default Review;
