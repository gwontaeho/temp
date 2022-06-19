import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export const Button = props => (
  <TouchableOpacity style={styles.touchableopacity} {...props}>
    <Text style={styles.text}>{props._text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  touchableopacity: {
    backgroundColor: 'black',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
