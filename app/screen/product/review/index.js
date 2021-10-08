import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const Review = () => {
  useEffect(() => {
    console.log('review');
  }, []);

  return (
    <View>
      <Text>Review</Text>
    </View>
  );
};

export default Review;
