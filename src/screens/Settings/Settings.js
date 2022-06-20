import React from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';

export const Settings = ({navigation}) => {
  return (
    <ScrollView>
      <View>
        <Text>Settings</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>to Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Deposit')}>
        <Text>to Deposit</Text>
      </Pressable>
    </ScrollView>
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
