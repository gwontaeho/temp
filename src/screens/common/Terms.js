import React, {useReducer, useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Text, VStack, HStack, Checkbox, Divider, Button} from 'native-base';
import {useMutation} from '@tanstack/react-query';
import {updateUserTerms} from '@apis';
import {AuthContext} from 'contexts';

export const Terms = () => {
  const {auth, signIn} = useContext(AuthContext);

  const [required, setRequired] = useState([
    {text: '이용약관 (필수)', checked: false},
    {text: '개인정보 수집 이용 (필수)', checked: false},
    {text: '만 14세 이상 (필수)', checked: false},
    {text: '위치정보 이용약관 동의 (필수)', checked: false},
  ]);
  const [marketing, setMarketing] = useState(false);

  const {mutate} = useMutation({
    mutationFn: () => updateUserTerms(auth.id),
    onSuccess: () => signIn({...auth, terms: true}),
  });

  const handleChangeAll = v => {
    setRequired(prev => prev.map(vv => ({...vv, checked: v})));
    setMarketing(v);
  };

  const isDisabled = required.some(v => v.checked === false);

  const handlePressOk = () => {
    if (isDisabled) return;
    mutate();
  };

  return (
    <SafeAreaView flex={1}>
      <VStack p={5} space={5}>
        <HStack
          bgColor="gray.200"
          p={3}
          rounded="sm"
          justifyContent="space-between">
          <Text>전체동의 (선택항목 포함)</Text>
          <Checkbox
            accessibilityLabel="label"
            isChecked={required.every(v => v.checked === true) && marketing}
            onChange={handleChangeAll}
          />
        </HStack>
        <VStack borderWidth={1} rounded="sm" borderColor="gray.400">
          {required.map(({text, checked}, i) => {
            return (
              <React.Fragment key={text}>
                <HStack p={3} rounded="sm" justifyContent="space-between">
                  <Text>{text}</Text>
                  <Checkbox
                    isChecked={checked}
                    accessibilityLabel="label"
                    onChange={v =>
                      setRequired(prev => {
                        let next = [...prev];
                        next[i].checked = v;
                        return next;
                      })
                    }
                  />
                </HStack>
                <Divider />
              </React.Fragment>
            );
          })}
          <HStack p={3} rounded="sm" justifyContent="space-between">
            <Text>마케팅 알림 수신 동의 (선택)</Text>
            <Checkbox
              accessibilityLabel="label"
              isChecked={marketing}
              onChange={v => setMarketing(v)}
            />
          </HStack>
        </VStack>
        <Button onPress={handlePressOk} isDisabled={isDisabled}>
          확인
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
