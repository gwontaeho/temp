import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  Pressable,
} from 'react-native';

export const Settings = ({navigation}) => {
  const data = [
    {
      title: '비홀드 서비스',
      data: ['1', '2', '3'],
    },
    {
      title: '비홀드 플러스',
      data: ['1', '2', '3'],
    },
    {
      title: '관리',
      data: ['1', '2', '3'],
    },
    {
      title: '고객센터',
      data: ['1', '2', '5'],
    },
  ];

  const renderItem = item => {
    return (
      <View style={styles.renderItem}>
        <Text style={styles.renderItem_title}>{item.item}</Text>
      </View>
    );
  };

  const renderSectionHeader = item => {
    return <Text>{item.section.title}</Text>;
  };

  return (
    <View>
      <View>
        <Text>Settings</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>to Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Deposit')}>
        <Text>to Deposit</Text>
      </Pressable>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  renderItem: {
    padding: 10,
  },
  renderItem_title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
