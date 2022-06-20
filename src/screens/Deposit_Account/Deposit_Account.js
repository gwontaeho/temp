import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Deposit_Account = () => {
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <Text>계좌정보</Text>
      </View>
      <View style={styles.precautions}>
        <Text>주의사항</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  account: {
    borderWidth: 1,
    flex: 1,
    padding: 20,
  },
  precautions: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
  },
});
