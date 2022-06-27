import React, {useCallback, useEffect, useState} from 'react';
import {
  Actionsheet,
  Text,
  View,
  Pressable,
  FlatList,
  Center,
  HStack,
} from 'native-base';

export const Pin = ({isOpen, onClose, onComplete}) => {
  const [pin, setPin] = useState('');

  const DATA = [
    {
      key: '1',
    },
    {
      key: '2',
    },
    {
      key: '3',
    },
    {
      key: '4',
    },
    {
      key: '5',
    },
    {
      key: '6',
    },
    {
      key: '7',
    },
    {
      key: '8',
    },
    {
      key: '9',
    },
    {
      key: '<',
    },
    {
      key: '0',
    },
    {
      key: '',
    },
  ];

  useEffect(() => {
    if (pin.length === 6) {
      // pin 번호 확인 api
      console.log('a');
      onClose();
      onComplete();
    }
  }, [pin]);

  const renderItem = ({item}) => (
    <Pressable flex={1} onPress={() => handlePressKey(item.key)}>
      <Center aspectRatio={4 / 3}>
        <Text>{item.key}</Text>
      </Center>
    </Pressable>
  );

  const handlePressKey = useCallback(
    key => {
      if (key === '<') return setPin(prev => prev.slice(0, -1));
      if (pin.length < 6) setPin(prev => prev + key);
    },
    [pin],
  );

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Center w="full" h="full">
          <HStack space={10} mb={10}>
            {new Array(6).fill('').map((v, i) => (
              <View
                key={i}
                w={2}
                h={2}
                borderWidth={1}
                borderRadius={2}
                bg={pin[i] ? '#000' : '#fff'}
              />
            ))}
          </HStack>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            numColumns={3}
            scrollEnabled={false}
            w="full"
            flexGrow={0}
          />
        </Center>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
