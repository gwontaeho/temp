import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Divider} from 'react-native-paper';

import axios from '../../axios';

import styles from './styles';

const Reservation = props => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [modify, setModify] = useState(false);

  useEffect(() => {
    console.log(props.route.params.user.token);
    requestUserData();
  }, []);

  const requestUserData = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/auth/user',
        {},
        {
          headers: {
            token: props.route.params.user.token,
          },
        },
      );
      setName(response.data.name);
      setPhone(response.data.phone);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPressModify = useCallback(() => {
    if (!modify) setModify(true);
    else setModify(false);
  }, [modify]);

  const onPressReserve = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/reservation/create',
        {
          name,
          phone,
          personnel: props.route.params.personnel,
          scheduleId: props.route.params.schedule.id,
          productId: props.route.params.productData.id,
          sellerId: props.route.params.productData.sellerId,
        },
        {
          headers: {token: props.route.params.user.token},
        },
      );
      if (response.status === 200) {
        props.navigation.reset({routes: [{name: 'ReservationOk'}]});
      }
    } catch (error) {
      if (error.response.status === 400) console.log('abc');
    }
  }, [name, phone]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>클래스 신청</Text>
      </View>
      <TouchableOpacity
        style={styles.button_reservation}
        onPress={onPressReserve}>
        <Text>예약 하기</Text>
      </TouchableOpacity>
      <Divider />
      <ScrollView style={styles.scrollview}>
        <View style={styles.title}>
          <Text>예약자 정보</Text>
        </View>
        {!modify ? (
          <View style={styles.user}>
            <Text>이름 : {name}</Text>
            <Text>연락처 : {phone}</Text>
          </View>
        ) : (
          <View style={styles.user}>
            <TextInput value={name} onChangeText={setName} />
            <TextInput value={phone} onChangeText={setPhone} />
          </View>
        )}
        <TouchableOpacity onPress={onPressModify}>
          <Text>{!modify ? '수정 ' : '확인'}</Text>
        </TouchableOpacity>
        <Divider />
        <View style={styles.title}>
          <Text>클래스 정보</Text>
        </View>
        <View style={styles.class}>
          <Text>클래스 명 : {props.route.params.productData.name}</Text>
          <Text>
            주소 :{' '}
            {props.route.params.productData.address === '&&'
              ? null
              : props.route.params.productData.address.split('&')[1] +
                ' ' +
                props.route.params.productData.address.split('&')[2]}
          </Text>
          <Text>수강료 : {props.route.params.productData.price}</Text>
        </View>
        <Divider />
        <View style={styles.title}>
          <Text>예약 일정</Text>
        </View>
        <View style={styles.schedule}>
          <Text>
            일자 :{' '}
            {String(props.route.params.schedule.ymd).substr(0, 4) +
              ' / ' +
              String(props.route.params.schedule.ymd).substr(4, 2) +
              ' / ' +
              String(props.route.params.schedule.ymd).substr(6, 2)}
          </Text>
          <Text>
            시간 :{' '}
            {props.route.params.schedule.start.substr(0, 2) +
              '시 ' +
              props.route.params.schedule.start.substr(2, 2) +
              '분 부터 ' +
              props.route.params.schedule.end.substr(0, 2) +
              '시 ' +
              props.route.params.schedule.end.substr(2, 2) +
              '분 까지'}
          </Text>
          <Text>인원 : {props.route.params.personnel}명</Text>
        </View>
        <Divider />
      </ScrollView>
    </View>
  );
};

export default Reservation;
