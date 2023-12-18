import React, {useState, useEffect} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import {VStack, HStack, Button, Text, Pressable, View} from 'native-base';
import axios from 'axios';

export const ModalFormFilter = ({values, onComplete}) => {
  const [visible, setVisible] = useState(false);

  const [time, setTime] = useState(values.filter.time);
  const [sort, setSort] = useState(values.sort);
  const [type, setType] = useState(values.type);

  const timeOptions = [0, 60, 90, 120, 150];
  const sortOptions = ['distance', 'price', 'createdAt'];
  const typeOptions = ['all', 'user', 'share'];

  const timeText = v => {
    return v === 0 ? '전체' : `${v}분`;
  };

  const sortText = v => {
    switch (v) {
      case 'distance':
        return '거리순';
      case 'price':
        return '높은가격순';
      case 'createdAt':
        return '시간순';
    }
  };

  const typeText = v => {
    switch (v) {
      case 'all':
        return '전체';
      case 'user':
        return '사용자';
      case 'share':
        return '업체';
    }
  };

  const handlePressOk = () => {
    onComplete({sort, filter: {time}, type});
    setVisible(false);
  };

  return (
    <>
      <Button onPress={() => setVisible(true)} size="sm">
        {`${timeText(values.filter.time)} · ${sortText(
          values.sort,
        )} · ${typeText(values.type)}`}
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
              <VStack space={3} alignItems="center">
                <Button.Group isAttached>
                  {timeOptions.map(v => {
                    const variant = v === time ? 'solid' : 'outline';
                    return (
                      <Button
                        flex={1}
                        onPress={() => setTime(v)}
                        key={v}
                        variant={variant}>
                        {timeText(v)}
                      </Button>
                    );
                  })}
                </Button.Group>
                <Button.Group isAttached>
                  {sortOptions.map(v => {
                    const variant = v === sort ? 'solid' : 'outline';
                    return (
                      <Button
                        flex={1}
                        onPress={() => setSort(v)}
                        key={v}
                        variant={variant}>
                        {sortText(v)}
                      </Button>
                    );
                  })}
                </Button.Group>
                <Button.Group isAttached>
                  {typeOptions.map(v => {
                    const variant = v === type ? 'solid' : 'outline';
                    return (
                      <Button
                        flex={1}
                        onPress={() => setType(v)}
                        key={v}
                        variant={variant}>
                        {typeText(v)}
                      </Button>
                    );
                  })}
                </Button.Group>
              </VStack>
              <Button onPress={handlePressOk}>적용</Button>
            </VStack>
          </VStack>
        </SafeAreaView>
      </Modal>
    </>
  );
};
