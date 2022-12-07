import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Heading,
  HStack,
  FlatList,
  View,
  Modal,
} from 'native-base';

const ModalDetail = () => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="sm" onPress={() => setOpen(true)}>
        상세보기
      </Button>
      <Modal isOpen={open} onClose={close}>
        <Modal.Content>
          <Modal.Body alignItems="center">
            <Text>수원시 장안구</Text>
            <Text>아로마 · 90분 · 3인 · 7km</Text>
            <Text>카드결제 할게요</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="outline" onPress={close}>
                취소
              </Button>
              <Button>수락</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const renderItem = () => {
  return (
    <HStack
      p={3}
      alignItems="center"
      borderWidth={1}
      justifyContent="space-between">
      <Text>아로마 · 90분 · 3인 · 7km</Text>
      <ModalDetail />
    </HStack>
  );
};

export const CHistory = () => {
  const data = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    // {id: 7},
    // {id: 8},
    // {id: 9},
    // {id: 10},
    // {id: 11},
  ];

  return (
    <SafeAreaView flex={1}>
      <Heading p={10}>매칭 리스트</Heading>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View p={2.5} />}
        _contentContainerStyle={{p: 5}}
      />
    </SafeAreaView>
  );
};
