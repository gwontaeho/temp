import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {Input, Divider, Button} from 'native-base';

export const Payment_Complete = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>결제완료</Text>
      </View>
      <Button>내 거래내역 보기</Button>
      <Button onPress={() => navigation.navigate('Tabs')}>메인으로</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
