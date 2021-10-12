import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Divider, FAB, Modal, Portal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios';

import styles from './styles';

import Detail from './detail';
import Review from './review';
import Qna from './qna';

const Product = props => {
  const today = new Date();
  const todayYmd =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? '0' + String(today.getMonth() + 1)
        : String(today.getMonth() + 1),
    ) +
    String(
      today.getDate() + 1 < 10
        ? '0' + String(today.getDate())
        : String(today.getDate()),
    );

  const [user, setUser] = useState({});
  const [productData, setProductData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleMonth, setScheduleMonth] = useState([]);
  const [scheduleYmd, setScheduleYmd] = useState([]);
  const [selectedYmd, setSelectedYmd] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [personnel, setPersonnel] = useState(1);
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);

  let scrollViewRef = useRef();

  useEffect(() => {
    check();
    requestProductData();
  }, []);

  const check = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('jsonValue');
      if (jsonValue !== null) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestProductData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/product?id=${props.route.params.id}`,
      );
      console.log(response.data);
      let newScheduleMonth = [];
      let newScheduleYmd = [];
      response.data.schedules.forEach(v => {
        newScheduleMonth.push(String(v.ymd).substring(4, 6));
        newScheduleYmd.push(v.ymd);
      });
      const set = new Set(newScheduleYmd);
      const set2 = new Set(newScheduleMonth);
      newScheduleYmd = [...set];
      newScheduleMonth = [...set2];
      setScheduleData(response.data.schedules);
      setScheduleMonth(newScheduleMonth);
      setScheduleYmd(newScheduleYmd);
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const category = useCallback(v => {
    switch (v) {
      case 'all':
        return '[전체] ';
      case 'flower':
        return '[플라워] ';
      case 'art':
        return '[미술] ';
      case 'cooking':
        return '[요리] ';
      case 'handmade':
        return '[수공예] ';
      case 'activity':
        return '[액티비티] ';
      case 'etc':
        return '[기타] ';
    }
  }, []);

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const onPressMonth = useCallback(
    v => {
      console.log(v);
      let newSelectedYmd = [];
      scheduleYmd.forEach(ymd => {
        if (v === String(ymd).substring(4, 6)) newSelectedYmd.push(ymd);
      });
      setSelectedYmd(newSelectedYmd);
      setSelectedSchedule([]);
      setSchedule({});
      setPersonnel(1);
    },
    [scheduleYmd],
  );

  const onPressYmd = useCallback(
    v => {
      let newSelectedSchedule = [];
      scheduleData.forEach(schedule => {
        if (schedule.ymd === v) newSelectedSchedule.push(schedule);
      });
      setSelectedSchedule(newSelectedSchedule);
      setSchedule({});
      setPersonnel(1);
    },
    [scheduleData],
  );

  const onPressSchedule = useCallback(v => {
    console.log(v);
    setPersonnel(1);
    setSchedule(v);
  }, []);

  const onPressDec = useCallback(() => {
    if (personnel > 1) setPersonnel(personnel - 1);
  }, [personnel]);

  const onPressInc = useCallback(() => {
    if (schedule.reserved + personnel < schedule.personnel)
      setPersonnel(personnel + 1);
  }, [personnel, schedule]);

  const onPressReservation = useCallback(() => {
    hideModal();
    props.navigation.navigate('Reservation', {
      productData,
      schedule,
      user,
      personnel,
    });
  }, [productData, schedule, user, personnel]);

  const renderMonth = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.month_item}
        onPress={() => onPressMonth(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderYmd = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.month_item}
        onPress={() => onPressYmd(item)}>
        <Text>{String(item).substring(6, 8)}</Text>
      </TouchableOpacity>
    );
  };

  const renderSchedule = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.month_item}
        onPress={() => {
          if (item.reserved !== item.personnel) onPressSchedule(item);
        }}>
        <Text>
          {item.start.substr(0, 2) +
            ' : ' +
            item.start.substr(2, 4) +
            ' ~ ' +
            item.end.substr(0, 2) +
            ' : ' +
            item.end.substr(2, 4) +
            '   ' +
            item.reserved +
            ' / ' +
            item.personnel}
        </Text>
      </TouchableOpacity>
    );
  };

  return Object.keys(productData).length === 0 ? null : (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={styles.modal}
          contentContainerStyle={styles.containerStyle}>
          <View>
            <View>
              <Text>월 선택</Text>
            </View>
            <FlatList
              data={scheduleMonth}
              renderItem={renderMonth}
              keyExtractor={item => item}
              horizontal={true}
            />
          </View>
          {Object.keys(selectedYmd).length === 0 ? null : (
            <View>
              <Text>날짜 선택</Text>
              <FlatList
                data={selectedYmd}
                renderItem={renderYmd}
                keyExtractor={item => item}
                horizontal={true}
              />
            </View>
          )}
          {Object.keys(selectedSchedule).length === 0 ? null : (
            <View>
              <Text>일정 선택</Text>
              <FlatList
                data={selectedSchedule}
                renderItem={renderSchedule}
                keyExtractor={item => item.id}
                horizontal={true}
              />
            </View>
          )}
          {Object.keys(schedule).length === 0 ? null : (
            <View style={styles.reservation_button}>
              <View style={styles.personnel}>
                <TouchableOpacity
                  style={styles.personnel_item}
                  onPress={onPressDec}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text>{personnel}</Text>
                <TouchableOpacity
                  style={styles.personnel_item}
                  onPress={onPressInc}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onPressReservation}>
                <Text>신청하기</Text>
              </TouchableOpacity>
            </View>
          )}
        </Modal>
      </Portal>
      <View style={styles.header}>
        <View style={styles.header_space}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header_space}>
          <TouchableOpacity
            onPress={() => scrollViewRef.current.scrollTo({y: 0})}>
            <Text>위로</Text>
          </TouchableOpacity>
        </View>
      </View>
      {Object.keys(user).length === 0 ? (
        <FAB
          style={styles.fab}
          small
          label="로그인"
          onPress={() => props.navigation.navigate('Login')}
        />
      ) : (
        <FAB style={styles.fab} small label="신청하기" onPress={showModal} />
      )}
      <ScrollView ref={scrollViewRef}>
        <Image
          source={{
            uri:
              'http://172.30.1.27:3005' +
              productData.img.replace(/\\/gi, '/').replace(/public/gi, ''),
          }}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text>{category(productData.category) + productData.name}</Text>
        </View>
        <Divider />
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(0)}>
            <Text>정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(1)}>
            <Text>후기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(2)}>
            <Text>문의</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        {selected === 0 ? (
          <Detail details={productData.detail} />
        ) : selected === 1 ? (
          <Review productId={productData.id} />
        ) : (
          <Qna
            productId={productData.id}
            user={user}
            sellerId={productData.sellerId}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Product;
