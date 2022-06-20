import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {Input, Divider, Button} from 'native-base';

export const Payment = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>잔여수량</Text>
        <View style={styles.infoText}>
          <Text>총 300,000,000원 중</Text>
          <Text>100,000,000원</Text>
          <Text>1인당 구매 가능 수량 100개</Text>
          <Text>후원권 개당 가격 10,000원</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <View style={styles.amountBuy}>
          <View>
            <Text>구매수량</Text>
            <Text>최대 100개</Text>
          </View>
          <Input w={100} />
        </View>
        <View style={styles.price}>
          <Text>개당가격</Text>
          <Text>10,000원</Text>
        </View>
        <Divider />
        <View style={styles.total}>
          <Text>총 0원</Text>
        </View>
      </View>
      <Button onPress={() => navigation.navigate('Payment_Check')}>다음</Button>
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
  infoTitle: {
    marginBottom: 20,
  },
  infoText: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#eee',
  },
  amountContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  amountBuy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  total: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
});
