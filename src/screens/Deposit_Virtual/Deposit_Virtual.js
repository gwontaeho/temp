import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Divider} from 'native-base';

export const Deposit_Virtual = () => {
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <Text>계좌정보</Text>
        <View style={styles.accountCreate}>
          <Text style={{marginBottom: 10}}>아직 발급된 계좌가 없습니다</Text>
          <Text>예치금 입금을 위한 가상계좌가 발급되지 않았습니다.</Text>
          <Text>간단하게 계좌를 발급해보세요!</Text>
          <Button style={{marginTop: 10}}>가상계좌 발급하기</Button>
        </View>
        {/* <View style={styles.accountInfo}>
          <Text>신한은행</Text>
          <Text>152853123212</Text>
          <Divider />
          <View style={styles.accountText}>
            <Text>예금주</Text>
            <Text>비홀드 홍길동</Text>
          </View>
          <View style={styles.accountText}>
            <Text>생성일</Text>
            <Text>2022년 6월 1일</Text>
          </View>
        </View> */}
      </View>
      <View style={styles.precautions}>
        <Text>주의사항</Text>
        <Text>주의사항1</Text>
        <Text>주의사항2</Text>
        <Text>주의사항3</Text>
        <Text>주의사항4</Text>
      </View>
      <Button>확인</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  account: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  accountCreate: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 200,
  },
  accountInfo: {
    height: 200,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-around',
    backgroundColor: '#eee',
  },
  accountText: {
    flexDirection: 'row',
  },
  precautions: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
