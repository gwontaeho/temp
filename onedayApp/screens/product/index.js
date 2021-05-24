import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const Product = ({route, navigation}) => {
  const {id} = route.params;
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [scheduleYm, setScheduleYm] = useState([]);
  const [scheduleYmd, setScheduleYmd] = useState([]);
  const [selectedYmd, setSelectedYmd] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [ym, setYm] = useState('');
  const [ymd, setYmd] = useState('');
  const [schedule, setSchedule] = useState({});
  const [personnel, setPersonnel] = useState(1);

  /* 예약시 전송할 데이터 */
  /* seller id, user id, schedule id, class id, personnel */

  useEffect(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await axios.post('http://172.30.1.27:3005/api/product', {
        id,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getSchedules = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://172.30.1.27:3005/api/schedule',
        {
          classId: data.id,
        },
      );

      response.data.sort((a, b) => {
        return a.time - b.time;
      });

      let ymArray = [];
      let ymdArray = [];

      response.data.map(v => {
        ymArray.push(v.time.substring(0, 6));
        ymdArray.push(v.time.substring(0, 8));
      });

      const ymSetArray = Array.from(new Set(ymArray));
      const ymdSetArray = Array.from(new Set(ymdArray));

      let selectedYmdArray = [];
      ymdSetArray.map(v => {
        if (v.indexOf(ymSetArray[0]) != -1) {
          selectedYmdArray.push(v);
        }
      });

      let selectedSchedulesArray = [];
      response.data.map(v => {
        if (v.time.indexOf(ymdSetArray[0]) != -1) {
          selectedSchedulesArray.push(v);
        }
      });

      setYm(ymSetArray[0]);
      setYmd(ymdSetArray[0]);
      setSchedules(response.data);
      setScheduleYm(ymSetArray);
      setScheduleYmd(ymdSetArray);
      setSelectedYmd(selectedYmdArray);
      setSelectedSchedules(selectedSchedulesArray);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onPressYm = useCallback(
    item => {
      let selectedYmdArray = [];
      scheduleYmd.map(v => {
        if (v.indexOf(item) != -1) {
          selectedYmdArray.push(v);
        }
      });
      setSelectedYmd(selectedYmdArray);
      setSelectedSchedules([]);
      setYm(item);
      setYmd('');
      setSchedule({});
    },
    [scheduleYmd],
  );

  const onPressYmd = useCallback(
    item => {
      let array = [];
      schedules.map(v => {
        if (v.time.indexOf(item) != -1) {
          array.push(v);
        }
      });
      setSelectedSchedules(array);
      setYmd(item);
      setSchedule({});
    },
    [schedules],
  );

  const onPressSchedule = useCallback(item => {
    setSchedule(item);
  }, []);

  const onPressDecrease = useCallback(() => {
    if (personnel > 1) {
      setPersonnel(personnel - 1);
    }
  }, [personnel]);

  const onPressIncrease = useCallback(() => {
    setPersonnel(personnel + 1);
  }, [personnel]);

  const onPressApply = useCallback(() => {
    closeModal();
    navigation.navigate('Payment', {
      userId: user.id,
      data: data,
      schedule,
      personnel,
    });
  }, [user, data, schedule, personnel]);

  const renderYm = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 12,
          backgroundColor: ym == item ? 'gray' : null,
        }}
        onPress={() => onPressYm(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderYmd = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 12,
          backgroundColor: ymd == item ? 'gray' : null,
        }}
        onPress={() => onPressYmd(item)}>
        <Text>{item.substring(6, 8)}</Text>
      </TouchableOpacity>
    );
  };

  const renderSchedules = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 12,
          backgroundColor: item.id == schedule.id ? 'gray' : null,
        }}
        onPress={() => onPressSchedule(item)}>
        <Text>
          {item.time.substring(8, 10) + ':' + item.time.substring(10, 12)}
        </Text>
        <Text>
          {item.time.substring(12, 14) + ':' + item.time.substring(14, 16)}
        </Text>
        <Text>{item.reserved + '/' + item.personnel}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>하하하ㅏ</Text>
      </View>
      {Object.keys(data).length === 0 ? null : (
        <ScrollView style={styles.innerContainer}>
          <Image
            source={{
              uri:
                'http://172.30.1.27:3005' +
                data.img.replace(/\\/gi, '/').replace(/public/gi, ''),
            }}
            style={styles.image}
          />
          <View style={styles.content}>
            <View style={styles.name}>
              <Text>이름</Text>
            </View>
            <View style={styles.name}>
              <Text>이름</Text>
            </View>
            <View style={styles.name}>
              <Text>이름</Text>
            </View>
            <View style={styles.name}>
              <Text>이름</Text>
            </View>
            <View style={styles.nav}>
              <View style={styles.navTitle}>
                <Text>상세정보</Text>
              </View>
              <View style={styles.navTitle}>
                <Text>리뷰</Text>
              </View>
              <View style={styles.navTitle}>
                <Text>Q&A</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {Object.keys(user).length === 0 ? (
        <TouchableOpacity style={styles.button}>
          <Text>로그인을 해주세요</Text>
        </TouchableOpacity>
      ) : user.type == 1 ? (
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text>신청하기</Text>
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onShow={getSchedules}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTitle}>
              <Text>날짜 선택</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalCalendar}>
              <View style={styles.modalDate}>
                <FlatList
                  data={scheduleYm}
                  renderItem={renderYm}
                  horizontal={true}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View style={styles.modalDate}>
                <FlatList
                  data={selectedYmd}
                  extraData={selectedYmd}
                  renderItem={renderYmd}
                  horizontal={true}
                  keyExtractor={item => item}
                />
              </View>
              <View style={styles.schedules}>
                <FlatList
                  data={selectedSchedules}
                  extraData={selectedSchedules}
                  renderItem={renderSchedules}
                  horizontal={true}
                  keyExtractor={item => item.id}
                />
              </View>
              <View style={styles.personnel}>
                <Text>신청인원</Text>
                <View style={styles.howManyPeople}>
                  <TouchableOpacity
                    style={styles.howManyPeopleItem}
                    onPress={onPressDecrease}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <View style={styles.howManyPeopleItem}>
                    <Text>{personnel}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.howManyPeopleItem}
                    onPress={onPressIncrease}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPressApply}>
              <Text>신청하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Product;
