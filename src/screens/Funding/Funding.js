import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

export const Funding = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text>펀딩제목</Text>
        <Text>작가</Text>
      </View>
      <Image source={{uri: 'https://picsum.photos/200'}} style={styles.image} />
      <Pressable onPress={() => navigation.navigate('Artist')}>
        <Text>to Artist</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Payment')}>
        <Text>to Payment</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
});
