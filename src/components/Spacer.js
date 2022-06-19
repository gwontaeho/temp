import React from 'react';
import {View} from 'react-native';

export const Spacer = props => {
  const style = {
    margin: props._m / 2,
  };

  return <View style={style} />;
};
