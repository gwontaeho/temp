import React from 'react';
import {SafeAreaView} from 'react-native';
import {VStack, Button} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {getDashboard} from '@apis';

export const ADashboard = ({navigation}) => {
  const {data, refetch} = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });

  const inquiryCount = data?.inquiryCount || 0;
  const userCount = data?.userCount || 0;
  const companyCount = data?.companyCount || 0;

  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} p={10} space={5}>
        <Button
          variant="outline"
          onPress={() => navigation.navigate('ACompanies')}>
          {`업체 관리 (${companyCount})`}
        </Button>
        <Button variant="outline" onPress={() => navigation.navigate('AUsers')}>
          {`회원 관리 (${userCount})`}
        </Button>
        <Button
          variant="outline"
          onPress={() => navigation.navigate('AInquiries')}>
          {`업체등록 문의 (${inquiryCount})`}
        </Button>
        <Button variant="outline" onPress={refetch}>
          새로고침
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
