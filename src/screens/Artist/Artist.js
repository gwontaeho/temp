import React from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';

export const Artist = ({navigation}) => {
  return (
    <ScrollView>
      <Pressable onPress={() => navigation.navigate('Funding')}>
        <Text>to Funding</Text>
      </Pressable>
    </ScrollView>
  );
};
