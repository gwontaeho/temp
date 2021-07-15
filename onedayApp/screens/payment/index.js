import React, {useCallback, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

import styles from './styles';

const Payment = ({navigation, route}) => {
  const {userId, data, schedule, personnel} = route.params;
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>결제하기</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.classInfo}>
          <Image
            source={{
              uri:
                'http://172.30.1.27:3005' +
                data.img.replace(/\\/gi, '/').replace(/public/gi, ''),
            }}
            style={styles.image}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Payment;
