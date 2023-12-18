import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Divider, Dialog, Portal} from 'react-native-paper';

import styles from './styles';

const ReservationOk = props => {
  const onPressButton = useCallback(() => {
    props.navigation.reset({routes: [{name: 'Home'}]});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>ONE DAY</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>예약완료!</Text>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton()}>
          <Text style={styles.button_text}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReservationOk;
