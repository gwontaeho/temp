import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const ReservationOk = props => {
  const onPressButton = useCallback(() => {
    props.navigation.reset({routes: [{name: 'Home'}]});
  }, []);

  return (
    <View style={styles.container}>
      <Text>예약성공!</Text>
      <TouchableOpacity onPress={onPressButton}>
        <Text>메인으로 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationOk;
