import React from 'react';
import {TextInput as RNTextInput} from 'react-native';

export const TextInput = props => {
  const style = {
    height: props._height || 40,
    padding: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  };

  return <RNTextInput style={style} {...props} />;
};
