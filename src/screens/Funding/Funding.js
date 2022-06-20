import React from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';

export const Funding = ({navigation}) => {
  return (
    <ScrollView>
      <Pressable onPress={() => navigation.navigate('Artist')}>
        <Text>to Artist</Text>
      </Pressable>
    </ScrollView>
  );
};
