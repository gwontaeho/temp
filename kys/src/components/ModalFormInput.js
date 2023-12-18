import React, {useState} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import {VStack, Button, Input, FormControl, Pressable} from 'native-base';

export const ModalFormInput = ({label, value, onComplete, InputProps}) => {
  const [visible, setVisible] = useState(false);

  const [text, setText] = useState(value);

  const handlePress = () => {
    onComplete(text);
    setVisible(false);
  };

  return (
    <>
      <FormControl>
        {!!label && <FormControl.Label>{label}</FormControl.Label>}
        <Pressable onPress={() => setVisible(true)}>
          <Input
            value={value}
            isReadOnly
            variant="underlined"
            onTouchStart={() => setVisible(true)}
            {...InputProps}
          />
        </Pressable>
      </FormControl>
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
                {!!label && <FormControl.Label>{label}</FormControl.Label>}
                <Pressable onPress={() => setVisible(true)}>
                  <Input
                    value={text}
                    variant="underlined"
                    onChangeText={v => setText(v)}
                    {...InputProps}
                  />
                </Pressable>
              </FormControl>
              <Button w="full" onPress={handlePress}>
                확인
              </Button>
            </VStack>
          </VStack>
        </SafeAreaView>
      </Modal>
    </>
  );
};
