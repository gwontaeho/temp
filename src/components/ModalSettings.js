import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Modal} from 'react-native';
import {VStack, Button, Text, Switch, HStack, Divider} from 'native-base';
import {useMutation} from '@tanstack/react-query';
import {AuthContext} from '@contexts';
import {updateUserMarketing} from '@apis';

export const ModalSettings = () => {
  const {auth, signOut, getData} = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(auth.marketing);

  const {mutate} = useMutation({
    mutationFn: variables => updateUserMarketing(variables),
    onSuccess: getData,
  });

  const handleToggle = v => {
    setIsChecked(v);
    mutate({id: auth.id, marketing: v});
  };

  return (
    <>
      <Button onPress={() => setVisible(true)} variant="outline">
        설정
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
            <VStack space={5}>
              <Divider />
              <HStack alignItems="center" justifyContent="space-between" px={3}>
                <Text>마케팅 알림 수신 동의</Text>
                <Switch
                  isChecked={isChecked}
                  size="sm"
                  onToggle={handleToggle}
                />
              </HStack>
              <Divider />
            </VStack>
          </VStack>
        </SafeAreaView>
      </Modal>
    </>
  );
};
