import React, {useState} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import {VStack, Button, Input, FormControl, Heading, Text} from 'native-base';

export const ModalFormPrice = ({category, setCategory, onComplete}) => {
  const [price_60, setPrice_60] = useState('');
  const [price_90, setPrice_90] = useState('');
  const [price_120, setPrice_120] = useState('');
  const [price_150, setPrice_150] = useState('');

  const handlePress = () => {
    const numReg = /^[0-9]*$/;
    const prices = [price_60, price_90, price_120, price_150];
    const filter = prices.filter(v => numReg.test(v) && !!v);
    const every = filter.every(v => Number(v) >= 40000 && Number(v) <= 150000);
    console.log(filter);
    if (!every) return;
    onComplete({
      category,
      price_60: price_60 || null,
      price_90: price_90 || null,
      price_120: price_120 || null,
      price_150: price_150 || null,
    });

    setCategory('');
    setPrice_60('');
    setPrice_90('');
    setPrice_120('');
    setPrice_150('');
  };

  return (
    <Modal
      animationType="fade"
      visible={!!category}
      onRequestClose={() => setCategory('')}>
      <SafeAreaView>
        <VStack p={5}>
          <Button
            variant="ghost"
            alignSelf="flex-end"
            mb={5}
            onPress={() => setCategory('')}>
            닫기
          </Button>

          <VStack space={10}>
            <Heading>{`${category}`}</Heading>
            <VStack space={3}>
              <FormControl>
                <FormControl.Label>60분</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  value={price_60}
                  onChangeText={v => setPrice_60(v)}
                  variant="underlined"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>90분</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  value={price_90}
                  onChangeText={v => setPrice_90(v)}
                  variant="underlined"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>120분</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  value={price_120}
                  onChangeText={v => setPrice_120(v)}
                  variant="underlined"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>150분</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  value={price_150}
                  onChangeText={v => setPrice_150(v)}
                  variant="underlined"
                />
              </FormControl>
              <Text color="info.600">
                * 금액은 40,000 ~ 150,000 내에서 설정할 수 있습니다
              </Text>
            </VStack>

            <Button w="full" onPress={handlePress}>
              저장
            </Button>
          </VStack>
        </VStack>
      </SafeAreaView>
    </Modal>
  );
};
