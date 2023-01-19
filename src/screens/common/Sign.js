import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {Button, Text, VStack, Input, FormControl, Heading} from 'native-base';
import {useMutation} from '@tanstack/react-query';
import DeviceInfo from 'react-native-device-info';
import {AuthContext} from 'contexts';
import {sms, sign, inquiry} from '@apis';

export const ModalInquiry = ({phone, device}) => {
  const {signIn} = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [company_name, setCompany_name] = useState('');

  const {mutate: inquiryMutate} = useMutation({
    mutationFn: () => inquiry({phone, device, company_name}),
    onSuccess: data => {
      // 로그인 성공
      const {user, token} = data;
      const {id, phone, role, status} = user;
      signIn({id, phone, role, status, token});
    },
    onError: error => {
      // 로그인 실패
      setSignError(true);
    },
    onSettled: () => setVisible(false),
  });

  return (
    <>
      <Button variant="outline" onPress={() => setVisible(true)}>
        업체 등록 문의
      </Button>
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <SafeAreaView>
          <Button
            variant="ghost"
            alignSelf="flex-end"
            mr={5}
            onPress={() => setVisible(false)}>
            닫기
          </Button>

          <VStack p={5} space={10}>
            <FormControl>
              <FormControl.Label>업체명을 입력해주세요</FormControl.Label>
              <Input
                value={company_name}
                onChangeText={v => setCompany_name(v)}
                variant="underlined"
              />
            </FormControl>
            <Button w="full" onPress={inquiryMutate}>
              확인
            </Button>
          </VStack>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export const Sign = () => {
  const {auth, signIn} = useContext(AuthContext);

  const [phone, setPhone] = useState('');
  const [device, setDevice] = useState('');
  const [code, setCode] = useState('');
  const [check, setCheck] = useState('');
  const [signError, setSignError] = useState(false);

  const {mutate: smsMutate} = useMutation({
    mutationFn: variables => sms(variables),
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const {mutate: signMutate} = useMutation({
    mutationFn: variables => sign(variables),
    onSuccess: data => {
      // 로그인 성공
      const {user, token} = data;
      const {id, phone, role, status, Company} = user;
      signIn({id, phone, role, status, token, Company});
    },
    onError: error => {
      // 로그인 실패
      setSignError(true);
    },
  });

  useEffect(() => {
    getUniqueId();
  }, []);

  const getUniqueId = async () => {
    const uniqueId = await DeviceInfo.getUniqueId();
    setDevice(uniqueId);
  };

  const handlePressSign = () => {
    // if (!phone || code !== check) return setSignError(true);
    signMutate({phone, device});
  };

  const handlePressSend = () => {
    if (!phone) return;
    const random = (Math.random() * 1000000).toFixed(0);
    const content = random.padStart(6, '0');
    setCode(content);
    smsMutate({content, to: phone});
  };

  return (
    <SafeAreaView flex={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack flex={1} p={10} space={5} justifyContent="center">
          <Heading>로고</Heading>
          <VStack>
            <FormControl>
              <FormControl.Label>휴대폰 번호</FormControl.Label>
              <Input
                h={10}
                size="md"
                value={phone}
                maxLength={11}
                onChangeText={text => setPhone(text)}
                InputRightElement={
                  <Button
                    size="sm"
                    rounded="none"
                    h="full"
                    isDisabled={!phone}
                    onPress={handlePressSend}>
                    {!!code ? '인증번호 재 전송' : '인증번호 전송'}
                  </Button>
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>인증번호</FormControl.Label>
              <Input
                h={10}
                size="md"
                value={check}
                onChangeText={v => setCheck(v)}
              />
            </FormControl>
          </VStack>
          <Button onPress={handlePressSign}>로그인</Button>
          <ModalInquiry phone={phone} device={device} />
          <Text color="warning.600" textAlign="center">
            {signError ? '로그인에 실패하였습니다' : ' '}
          </Text>
        </VStack>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
