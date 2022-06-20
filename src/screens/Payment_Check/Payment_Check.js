import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {Input, Divider, Button} from 'native-base';

export const Payment_Check = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>최종 결제 금액</Text>
        <Text>100,000원</Text>
        <Text>보유 예치금</Text>
        <Text>1,500,000원</Text>
        <Text>결제시 차액 1,400,000원</Text>
      </View>
      <View style={styles.cautions}>
        <Text>주의사항</Text>
        <Text>-주의사항1</Text>
        <Text>-주의사항2</Text>
        <Text>-주의사항3</Text>
        <Text>-주의사항4</Text>
      </View>
      <Button onPress={() => navigation.navigate('Payment_Complete')}>
        다음
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  cautions: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
