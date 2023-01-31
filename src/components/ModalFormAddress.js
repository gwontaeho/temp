import React, {useState, useEffect} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import {VStack, Button, Input, FormControl, Text} from 'native-base';
import axios from 'axios';

export const ModalFormAddress = ({label, onComplete}) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(false);
  }, [visible]);

  const handlePress = async () => {
    try {
      const key = 'AIzaSyCkSBVah-2JTELaurbDImw32xidwTLY6CE';
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${text}&language=ko&key=${key}`,
      );
      const {status, results} = data;
      if (status !== 'OK' || results.length === 0)
        return setErrorMessage('주소를 정확히 입력해주세요');

      const {formatted_address, geometry} = results[0];
      if (!formatted_address.includes('대한민국')) return;
      const {lat: latitude, lng: longitude} = geometry.location;
      onComplete({
        type: 'setAddress',
        payload: {
          address: formatted_address.replace('대한민국 ', ''),
          latitude,
          longitude,
        },
      });
      setVisible(false);
    } catch (error) {
      return setErrorMessage('주소를 정확히 입력해주세요');
    }
  };

  return (
    <>
      <Button size="sm" onPress={() => setVisible(true)}>
        {label}
      </Button>
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <SafeAreaView>
          <VStack p={5}>
            <Button
              variant="ghost"
              alignSelf="flex-end"
              mb={5}
              onPress={() => setVisible(false)}>
              닫기
            </Button>
            <VStack space={10}>
              <FormControl>
                <FormControl.Label>주소를 입력해주세요</FormControl.Label>
                <Input
                  value={text}
                  onChangeText={v => setText(v)}
                  variant="underlined"
                />
              </FormControl>
              <VStack space={3}>
                <Button w="full" onPress={handlePress}>
                  확인
                </Button>
                {!!errorMessage && (
                  <Text textAlign="center" color="danger.600">
                    {errorMessage}
                  </Text>
                )}
              </VStack>
            </VStack>
          </VStack>
        </SafeAreaView>
      </Modal>
    </>
  );
};
