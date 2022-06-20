import React from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {Button} from 'native-base';

export const Deposit = ({navigation}) => {
  const data = [
    {
      id: 1,
      text: '1',
    },
    {
      id: 2,
      text: '2',
    },
    {
      id: 3,
      text: '3',
    },
    {
      id: 4,
      text: '3',
    },
    {
      id: 5,
      text: '3',
    },
    {
      id: 6,
      text: '3',
    },
    {
      id: 7,
      text: '3',
    },
  ];

  const renderItem = ({item}) => {
    const {id, text} = item;

    return (
      <View style={styles.renderItem}>
        <View>
          <Text>아이디</Text>
          <Text>아이디</Text>
          <Text>아이디</Text>
          <Text>아이디</Text>
        </View>
        <Text>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.deposit}>
        <View style={styles.depositCard}>
          <Text>예치금</Text>
          <Text>1,500,000원</Text>
          <View style={styles.depositButtons}>
            <Button
              onPress={() => navigation.navigate('Deposit_Account')}
              style={{width: 100, marginRight: 20}}>
              출금
            </Button>
            <Button
              onPress={() => navigation.navigate('Deposit_Virtual')}
              style={{flex: 1}}>
              충전
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.history}>
        <Text>내역보기</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deposit: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  depositCard: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
  },
  depositButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  history: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
  },
  flatList: {
    marginTop: 20,
  },
  renderItem: {
    borderWidth: 1,
  },
});
