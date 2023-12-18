import React, {useRef, useCallback} from 'react';
import {Animated} from 'react-native';

export const ImageLoader = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Image
      {...props}
      onLoad={onLoad}
      style={[
        props.style,
        {
          opacity,
        },
      ]}
    />
  );
};
