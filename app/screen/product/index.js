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
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [bgColor, setBgColor] = useState(0);
  const [color, setColor] = useState('white');

  const [month, setMonth] = useState();
  const [date, setDate] = useState();
  const [scd, setScd] = useState();

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
        `/api/product/${props.route.params.id}?&today=${todayYmd}`,
      );
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

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const onPressMonth = useCallback(
    v => {
      console.log(v);
      let newSelectedYmd = [];
      scheduleYmd.forEach(ymd => {
        if (v === String(ymd).substring(4, 6)) newSelectedYmd.push(ymd);
      });
      setMonth(v);
      setDate();
      setScd();
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
      setDate(v);
      setScd();
      setSelectedSchedule(newSelectedSchedule);
      setSchedule({});
      setPersonnel(1);
    },
    [scheduleData],
  );

  const onScroll = useCallback(e => {
    setBgColor(e.nativeEvent.contentOffset.y / 200);
    if (e.nativeEvent.contentOffset.y / 200 > 1) setColor('black');
    else setColor('white');
  }, []);

  const onPressSchedule = useCallback(v => {
    console.log(v);
    setScd(v);
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
        style={[
          styles.month_item,
          {borderColor: item === month ? 'blue' : 'lightgray'},
        ]}
        onPress={() => onPressMonth(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderYmd = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.month_item,
          {borderColor: item === date ? 'blue' : 'lightgray'},
        ]}
        onPress={() => onPressYmd(item)}>
        <Text>{String(item).substring(6, 8)}</Text>
      </TouchableOpacity>
    );
  };

  const renderSchedule = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.schedule_item,
          {borderColor: item === scd ? 'blue' : 'lightgray'},
        ]}
        onPress={() => {
          if (item.reserved !== item.personnel) onPressSchedule(item);
        }}>
        <Text style={styles.modal_text}>
          {item.start.substr(0, 2) +
            ':' +
            item.start.substr(2, 4) +
            ' ~ ' +
            item.end.substr(0, 2) +
            ':' +
            item.end.substr(2, 4)}
        </Text>
        <Text>{item.reserved + ' / ' + item.personnel}</Text>
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
            <View style={styles.modal_header}>
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
              <View style={styles.modal_header}>
                <Text>날짜 선택</Text>
              </View>
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
              <View style={styles.modal_header}>
                <Text>일정 선택</Text>
              </View>
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
              <TouchableOpacity
                onPress={onPressReservation}
                style={styles.button}>
                <Text>신청하기</Text>
              </TouchableOpacity>
            </View>
          )}
        </Modal>
      </Portal>

      <View
        style={[
          styles.header,
          {backgroundColor: `rgba(255, 255, 255, ${bgColor})`},
        ]}>
        <View style={styles.header_space}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Icon name="chevron-back-outline" color={color} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.header_space}>
          <TouchableOpacity
            onPress={() => scrollViewRef.current.scrollTo({y: 0})}>
            <Icon name="chevron-up-outline" color={color} size={20} />
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

      <ScrollView ref={scrollViewRef} onScroll={onScroll}>
        <Image
          source={{
            uri:
              'http://172.30.1.27:3005' +
              productData.img.replace(/\\/gi, '/').replace(/public/gi, ''),
          }}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text
            style={
              styles.title_text
            }>{`[${productData.category}] ${productData.name}`}</Text>
        </View>

        <View style={styles.product_title}>
          <Text style={styles.product_title_text}>클래스 정보</Text>
        </View>
        <Divider />

        <View style={styles.info}>
          <View style={styles.info_row}>
            <View style={styles.info_item}>
              <Icon name="star-outline" size={20} color="black" />
              <Text style={styles.info_text}>
                {productData.reviews[0] === undefined
                  ? 0
                  : productData.reviews[0].rating}
                점
              </Text>
            </View>
            <View style={styles.info_item}>
              <Icon name="location-outline" size={20} color="black" />
              <Text style={styles.info_text}>
                {productData.address.split('&')[0]}
              </Text>
            </View>
          </View>
          <View style={styles.info_row}>
            <View style={styles.info_item}>
              <Icon name="grid-outline" size={20} color="black" />
              <Text style={styles.info_text}>{productData.category}</Text>
            </View>
            <View style={styles.info_item}>
              <Icon name="time-outline" size={20} color="black" />
              <Text style={styles.info_text}>{productData.time} 분</Text>
            </View>
          </View>
        </View>

        <View style={styles.product_title}>
          <Text style={styles.product_title_text}>작가 소개</Text>
        </View>
        <Divider />

        <View style={styles.intro}>
          <View style={styles.intro_item}>
            <Image
              source={{
                uri:
                  'http://172.30.1.27:3005' +
                  productData.seller.img
                    .replace(/\\/gi, '/')
                    .replace(/public/gi, ''),
              }}
              style={styles.intro_image}
            />
          </View>
          <View style={styles.intro_item}>
            <Text style={styles.intro_text}>
              {productData.seller.introduce}
            </Text>
          </View>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(0)}>
            <Text style={styles.nav_text}>정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(1)}>
            <Text style={styles.nav_text}>후기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(2)}>
            <Text style={styles.nav_text}>문의</Text>
          </TouchableOpacity>
        </View>

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
