import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  VStack,
  Badge,
  Input,
  HStack,
  ScrollView,
  Pressable,
} from 'native-base';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {AuthContext} from '@contexts';
import {getAveragePrices, getPrices, upsertPrice} from '@apis';
import {ModalFormPrice} from '@components';
import {toDecimalString} from 'utils';

export const CPrices = () => {
  const queryClient = useQueryClient();

  const {auth} = useContext(AuthContext);
  const {Company} = auth;
  const {id} = Company;

  const categories = ['타이', '아로마', '스웨디시', '스페셜'];

  const [category, setCategory] = useState('');

  const {data: avgPrices} = useQuery({
    queryKey: ['CAveragePrices'],
    queryFn: getAveragePrices,
  });

  const {data = [], refetch} = useQuery({
    queryKey: ['CPrices'],
    queryFn: () => getPrices(id),
    enabled: !!id,
  });

  const {mutate: createMutate} = useMutation({
    mutationFn: variables => upsertPrice(variables),
    onSettled: refetch,
  });

  const handleComplete = v => {
    createMutate({...v, CompanyId: id});
  };

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VStack p={5} space={5}>
          {categories.map(category => {
            const categoryData = data.find(v => v.category === category);
            const {
              price_60 = '-',
              price_90 = '-',
              price_120 = '-',
              price_150 = '-',
            } = {...categoryData};

            const borderColor = !!categoryData ? 'info.600' : 'gray.600';

            return (
              <Pressable
                key={category}
                borderWidth={1}
                borderColor={borderColor}
                p={3}
                rounded="sm"
                onPress={() => setCategory(category)}>
                <HStack>
                  <VStack w={20}>
                    <Text fontSize="md" bold>
                      {category}
                    </Text>
                  </VStack>
                  <VStack p={3} flex={1} space={3} rounded="sm">
                    <HStack>
                      <VStack flex={1} alignItems="center">
                        <Text color="gray.600">60분</Text>
                        <Text fontSize="md">{toDecimalString(price_60)}원</Text>
                      </VStack>
                      <VStack flex={1} alignItems="center">
                        <Text color="gray.600">90분</Text>
                        <Text fontSize="md">{toDecimalString(price_90)}원</Text>
                      </VStack>
                    </HStack>
                    <HStack>
                      <VStack flex={1} alignItems="center">
                        <Text color="gray.600">120분</Text>
                        <Text fontSize="md">
                          {toDecimalString(price_120)}원
                        </Text>
                      </VStack>
                      <VStack flex={1} alignItems="center">
                        <Text color="gray.600">150분</Text>
                        <Text fontSize="md">
                          {toDecimalString(price_150)}원
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </HStack>
                {!categoryData && (
                  <Text color="warning.600">* 희망 단가를 설정해주세요</Text>
                )}
              </Pressable>
            );
          })}
        </VStack>
        <ModalFormPrice
          category={category}
          setCategory={setCategory}
          onComplete={handleComplete}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
