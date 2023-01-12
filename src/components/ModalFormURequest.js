import React, {useState} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import {VStack, Button, Input, FormControl, Pressable} from 'native-base';

export const ModalFormURequest = ({values, onComplete}) => {
  const [visible, setVisible] = useState(false);

  const [price, setPrice] = useState(values.price);
  const [description, setDescription] = useState(values.description);
  const [address_detail, setAddress_detail] = useState(values.address_detail);

  const handleChangePrice = v => {
    const numReg = /^[0-9]*$/;
    if (!numReg.test(v)) return;
    setPrice(v);
  };

  const handlePress = () => {
    onComplete({price, description, address_detail});
    setVisible(false);
  };

  const handleClose = () => {
    setPrice(values.price);
    setDescription(values.description);
    setAddress_detail(values.address_detail);
    setVisible(false);
  };

  return (
    <>
      <VStack space={3}>
        <FormControl>
          <FormControl.Label>금액</FormControl.Label>
          <Pressable onPress={() => setVisible(true)}>
            <Input
              value={values.price}
              isReadOnly
              variant="underlined"
              placeholder={values.average_price.toString()}
              onTouchStart={() => setVisible(true)}
            />
          </Pressable>
        </FormControl>
        <FormControl>
          <FormControl.Label>요청 사항</FormControl.Label>
          <Pressable onPress={() => setVisible(true)}>
            <Input
              value={values.description}
              isReadOnly
              variant="underlined"
              onTouchStart={() => setVisible(true)}
            />
          </Pressable>
        </FormControl>
        <FormControl>
          <FormControl.Label>상세 주소</FormControl.Label>
          <Pressable onPress={() => setVisible(true)}>
            <Input
              value={values.address_detail}
              isReadOnly
              variant="underlined"
              onTouchStart={() => setVisible(true)}
            />
          </Pressable>
        </FormControl>
      </VStack>
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <SafeAreaView>
          <Button
            variant="ghost"
            alignSelf="flex-end"
            mr={5}
            onPress={handleClose}>
            닫기
          </Button>

          <VStack p={5} space={10}>
            <VStack space={3}>
              <FormControl>
                <FormControl.Label>금액</FormControl.Label>
                <Input
                  value={price}
                  onChangeText={handleChangePrice}
                  variant="underlined"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>요청 사항</FormControl.Label>
                <Input
                  value={description}
                  onChangeText={v => setDescription(v)}
                  variant="underlined"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>상세 주소</FormControl.Label>
                <Input
                  value={address_detail}
                  onChangeText={v => setAddress_detail(v)}
                  variant="underlined"
                />
              </FormControl>
            </VStack>

            <Button w="full" onPress={handlePress}>
              확인
            </Button>
          </VStack>
        </SafeAreaView>
      </Modal>
    </>
  );
};
