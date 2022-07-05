import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useLazyQuery} from '@apollo/client';
import {
  Progress,
  Text,
  FlatList,
  View,
  Pressable,
  HStack,
  Badge,
} from 'native-base';
import {GET_FUNDINGS} from '#apollo/gql';
import {ImageLoader} from '#components/ImageLoader';

export const Fundings = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [getFundings, {data}] = useLazyQuery(GET_FUNDINGS, {
    fetchPolicy: 'no-cache',
  });
  const fundingList = data?.fundingList;

  useFocusEffect(
    useCallback(() => {
      getFundings();
    }, []),
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getFundings();
    setRefreshing(false);
  }, []);

  const renderItem = ({item}) => {
    const {id, title, artist} = item;
    return (
      <Pressable onPress={() => navigation.navigate('Funding', {id})}>
        <ImageLoader
          source={{uri: 'https://picsum.photos/200'}}
          aspectRatio={4 / 3}
          alt="image"
        />
        <View my={2.5}>
          <Text bold fontSize="lg">
            {title}
          </Text>
          <HStack space={1}>
            {artist.map(v => (
              <Text key={v.id}>{v.name}</Text>
            ))}
          </HStack>
        </View>
        <Progress value={45} rounded="none" _filledTrack={{rounded: 'none'}} />
        <HStack alignItems="center">
          <Text fontSize="md" bold>
            39.5% 모집
          </Text>
        </HStack>
        <Badge position="absolute" rounded="none" bg="#fff">
          NEW
        </Badge>
      </Pressable>
    );
  };

  return (
    <SafeAreaView flex={1} backgroundColor="#fff">
      <FlatList
        data={fundingList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        _contentContainerStyle={{p: 5}}
        ItemSeparatorComponent={() => <View m={5} />}
      />
    </SafeAreaView>
  );
};
