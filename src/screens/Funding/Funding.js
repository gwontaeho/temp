import React from 'react';
import {useQuery} from '@apollo/client';
import {SafeAreaView} from 'react-native';
import {
  Text,
  ScrollView,
  View,
  VStack,
  HStack,
  Image,
  Pressable,
  Button,
  Progress,
  Divider,
  Badge,
} from 'native-base';
import {GET_FUNDING} from '#apollo/gql';
import {ImageLoader} from '#components/ImageLoader';

export const Funding = ({route, navigation}) => {
  const id = route?.params?.id;
  const {data} = useQuery(GET_FUNDING, {
    variables: {id},
    fetchPolicy: 'no-cache',
  });
  const funding = data?.funding;
  const {title, bondPrice, bondTotalNumber, artist} = {...funding};

  return (
    <SafeAreaView flex={1} backgroundColor="#fff">
      <ScrollView flex={1} bg="#fff">
        <VStack pl={5} pt={5} pb={5} space={5}>
          <ImageLoader
            source={{uri: 'https://picsum.photos/200'}}
            alt="image"
            aspectRatio={4 / 3}
            borderTopLeftRadius={40}
          />
          <VStack pr={5} space={5}>
            <View>
              <Text>작가 채정선</Text>
              <Text fontSize="2xl" bold>
                {title}
              </Text>
            </View>
            <VStack space={2.5}>
              <Progress
                value={45}
                rounded="none"
                _filledTrack={{rounded: 'none'}}
              />
              <HStack alignItems="center">
                <Text fontSize="md" bold>
                  39.5% 모집
                </Text>
                <Text>&nbsp;|&nbsp;145명</Text>
              </HStack>
            </VStack>
            <VStack space={2.5}>
              <HStack alignItems="center">
                <Text w={20}>모집마감</Text>
                <Text>2022년 5월 20일</Text>
                <Badge ml={1} _text={{fontSize: 10}}>
                  D-12
                </Badge>
              </HStack>
              <HStack>
                <Text w={20}>작가명</Text>
                <Text>채정선</Text>
              </HStack>
              <HStack>
                <Text w={20}>목표금액</Text>
                <Text>{(bondPrice * bondTotalNumber).toLocaleString()} 원</Text>
              </HStack>
              <HStack>
                <Text w={20}>모집비용</Text>
                <Text>195,000,000 원</Text>
              </HStack>
            </VStack>
          </VStack>
        </VStack>

        <Divider />
      </ScrollView>
      <Button
        rounded="none"
        onPress={() => navigation.navigate('Payment', {funding})}>
        to payment
      </Button>
    </SafeAreaView>
  );
};
