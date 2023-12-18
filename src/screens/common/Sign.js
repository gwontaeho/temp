import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
} from 'react-native';
import {Button, Text, VStack, Input, FormControl, Image} from 'native-base';
import {useMutation} from '@tanstack/react-query';
import DeviceInfo from 'react-native-device-info';
import {AuthContext} from 'contexts';
import {sms, sign, inquiry} from '@apis';
import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';

import Logo from './logo.png';

export const ModalInquiry = ({
  phone,
  device,
  code,
  check,
  fcm_token,
  setSignError,
}) => {
  const {signIn} = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [company_name, setCompany_name] = useState('');

  const {mutate: inquiryMutate} = useMutation({
    mutationFn: () => inquiry({phone, device, company_name, fcm_token}),
    onSuccess: data => {
      // 로그인 성공
      const {user, token, date} = data;
      signIn({...user, token, date});
    },
    onError: error => {
      // 로그인 실패
      if (error.response.status === 400)
        return setSignError('다른 기기에서 로그인중입니다');
      setSignError('로그인에 실패하였습니다');
    },
    onSettled: () => setVisible(false),
  });

  const handlePressInquiry = () => {
    if (phone.startsWith('9999')) return setVisible(true);
    // 미 인증 시
    if (!code) return setSignError('휴대폰 인증을 해주세요');
    // 인증번호 미 입력 시
    if (!check) return setSignError('인증번호를 입력해 주세요');
    // 인증번호가 틀렸을 때
    if (code !== check) return setSignError('인증번호가 틀렸습니다');
    setVisible(true);
  };

  const handlePressMutate = () => {
    if (phone.startsWith('9999')) return inquiryMutate();

    // 미 인증 시
    if (!code) return setSignError('인증을 먼저 진행해주세요');
    // 인증번호 미 입력 시
    if (!check) return setSignError('인증번호를 입력해 주세요');
    // 인증번호가 틀렸을 때
    if (code !== check) return setSignError('인증번호가 틀렸습니다');

    inquiryMutate();
  };

  return (
    <>
      <Button variant="outline" onPress={handlePressInquiry}>
        업체 등록 문의
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
                <FormControl.Label>업체명을 입력해주세요</FormControl.Label>
                <Input
                  value={company_name}
                  onChangeText={v => setCompany_name(v)}
                  variant="underlined"
                />
              </FormControl>
              <Button w="full" onPress={handlePressMutate}>
                확인
              </Button>
            </VStack>
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
  const [signError, setSignError] = useState('');
  const [fcm_token, setFcm_token] = useState('');
  const [current, setCurrent] = useState(dayjs());
  const [waiting, setWaiting] = useState(null);

  const {mutateAsync} = useMutation({
    mutationFn: variables => sms(variables),
  });

  const {mutate: signMutate} = useMutation({
    mutationFn: variables => sign(variables),
    onSuccess: data => {
      // 로그인 성공
      const {user, token, date} = data;
      signIn({...user, token, date});
    },
    onError: error => {
      console.log(error);
      if (error.response.status === 400)
        return setSignError('다른 기기에서 로그인중입니다');
      setSignError('로그인에 실패하였습니다');
    },
  });

  useEffect(() => {
    getUniqueId();
    getToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(dayjs());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // device id
  const getUniqueId = async () => {
    const uniqueId = await DeviceInfo.getUniqueId();
    setDevice(uniqueId);
  };

  // fcm token
  const getToken = async () => {
    const token = await messaging().getToken();
    setFcm_token(token);
  };

  const handlePressSign = () => {
    /// test 계정
    if (phone.startsWith('9999')) return signMutate({phone, device, fcm_token});

    // 미 인증 시
    if (!code) return setSignError('휴대폰 인증을 해주세요');
    // 인증번호 미 입력 시
    if (!check) return setSignError('인증번호를 입력해 주세요');
    // 인증번호가 틀렸을 때
    if (code !== check) return setSignError('인증번호가 틀렸습니다');

    signMutate({phone, device, fcm_token});
  };

  const handlePressSend = async () => {
    // 전화번호 입력 오류
    if (!phone || phone.length < 11)
      return setSignError('휴대폰 번호를 정확히 입력해주세요');

    const random = (Math.random() * 1000000).toFixed(0);
    const content = random.padStart(6, '0');

    try {
      await mutateAsync({content, to: phone});
      setSignError(' ');
      setCode(content);
      setWaiting(dayjs().add(30, 's'));
    } catch (error) {
      return setSignError('휴대폰 번호를 정확히 입력해주세요');
    }
  };

  return (
    <SafeAreaView flex={1}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack flex={1} p={10} space={5} justifyContent="center">
            <VStack>
              <Image
                source={Logo}
                alt="logo"
                w={150}
                h={150}
                alignSelf="center"
              />
              <FormControl>
                <FormControl.Label>휴대폰 번호</FormControl.Label>
                <Input
                  h={10}
                  size="md"
                  value={phone}
                  isReadOnly={dayjs(waiting).isValid() && waiting > current}
                  keyboardType="number-pad"
                  maxLength={11}
                  onChangeText={text => {
                    setPhone(text);
                    setCode('');
                    setCheck('');
                  }}
                  InputRightElement={
                    <Button
                      size="sm"
                      rounded="none"
                      h="full"
                      isDisabled={
                        !phone ||
                        phone.length < 11 ||
                        (dayjs(waiting).isValid() && waiting > current)
                      }
                      onPress={handlePressSend}>
                      {!!code ? '인증번호 재 전송' : '인증번호 전송'}
                    </Button>
                  }
                />
                {dayjs(waiting).isValid() && waiting > current && (
                  <FormControl.HelperText alignSelf="flex-end">
                    {`재 전송 대기시간 : ${waiting.diff(current, 's')}`}
                  </FormControl.HelperText>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>인증번호</FormControl.Label>
                <Input
                  h={10}
                  size="md"
                  maxLength={6}
                  value={check}
                  keyboardType="number-pad"
                  isDisabled={!code}
                  onChangeText={v => setCheck(v)}
                />
              </FormControl>
            </VStack>
            <Button onPress={handlePressSign}>로그인</Button>
            <ModalInquiry
              phone={phone}
              device={device}
              code={code}
              check={check}
              fcm_token={fcm_token}
              setSignError={setSignError}
            />
            <Text color="warning.600" textAlign="center">
              {signError || ' '}
            </Text>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
