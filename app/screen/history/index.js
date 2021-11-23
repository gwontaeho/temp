import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from '../../axios';

import styles from './styles';

const History = props => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(0);
  const [reservationData, setReservationData] = useState([]);
  const [reservationCount, setReservationCount] = useState(0);
  const [endPage, setEndPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    requestHistoryData();
  }, [state, page]);

  const requestHistoryData = useCallback(
    async v => {
      try {
        const response = await axios.post(
          '/api/reservation/lookup',
          {
            state,
            checked: false,
            page,
          },
          {
            headers: {
              token: props.route.params.token,
            },
          },
        );
        console.log(response.data);
        console.log(response.data.count);
        if (page === 1) {
          setReservationData(response.data.data);
        } else {
          setReservationData([...reservationData, ...response.data.data]);
        }
        setReservationCount(response.data.count);
        setEndPage(Math.ceil(response.data.count / 5));
      } catch (error) {
        console.log(error);
      }
    },
    [reservationData, state, page],
  );

  const onPressItem = useCallback(v => {
    props.navigation.navigate('HistoryDetail', {
      token: props.route.params.token,
      id: v,
    });
  }, []);

  const onEndReached = useCallback(() => {
    console.log('end');
    if (page < endPage) {
      setPage(page + 1);
      console.log('pagignation');
    }
  }, [page, endPage]);

  const openMenu = useCallback(() => setVisible(true), []);

  const closeMenu = useCallback(() => setVisible(false), []);

  const renderList = ({item}) => {
    console.log(item);
    const uri =
      'http://172.30.1.27:3005' +
      item.product.img.replace(/\\/gi, '/').replace(/public/gi, '');
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item.id)}
        style={styles.list_item}>
        <View style={styles.list_item_info}>
          <View style={styles.list_item_img_container}>
            <Image
              source={{
                uri,
              }}
              style={styles.list_item_img}
            />
          </View>
          <View style={styles.list_item_texts}>
            <Text>[{item.product.category}]</Text>
            <Text>{item.product.name}</Text>
          </View>
        </View>
        <View style={styles.list_item_ymd}>
          <Text style={styles.text}>예약 일자 : </Text>
          <Text style={styles.text}>
            {item.createdAt.substr(0, 4) +
              '. ' +
              item.createdAt.substr(5, 2) +
              '. ' +
              item.createdAt.substr(8, 2)}
          </Text>
        </View>
        <View style={styles.list_item_ymd}>
          <Text style={styles.text}>수강 일자 : </Text>
          <Text style={styles.text}>
            {String(item.schedule.ymd).substr(0, 4) +
              '. ' +
              String(item.schedule.ymd).substr(4, 2) +
              '. ' +
              String(item.schedule.ymd).substr(6, 2) +
              ' / ' +
              item.schedule.start.substr(0, 2) +
              ':' +
              item.schedule.start.substr(2, 2) +
              ' ~ ' +
              item.schedule.end.substr(0, 2) +
              ' : ' +
              item.schedule.start.substr(2, 2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>예약 내역</Text>
      </View>
      <Divider />
      <View style={styles.menu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.menu_title}>
              <Text>
                {state === 0
                  ? '예약 중 '
                  : state === 1
                  ? '수강 완료 '
                  : state === 2
                  ? '취소 요청 '
                  : state === 3
                  ? '취소 '
                  : '예약 대기 '}
              </Text>
              <Text>{`${reservationCount}건 `}</Text>
              <Icon name="chevron-down-outline" color="black" size={15} />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              setState(4);
              setPage(1);
              closeMenu();
            }}
            title="예약 대기"
          />
          <Menu.Item
            onPress={() => {
              setState(0);
              setPage(1);
              closeMenu();
            }}
            title="예약 중"
          />
          <Menu.Item
            onPress={() => {
              setState(1);
              setPage(1);
              closeMenu();
            }}
            title="수강 완료"
          />
          <Menu.Item
            onPress={() => {
              setState(2);
              setPage(1);
              closeMenu();
            }}
            title="취소 요청"
          />
          <Menu.Item
            onPress={() => {
              setState(3);
              setPage(1);
              closeMenu();
            }}
            title="취소"
          />
        </Menu>
      </View>

      <View style={styles.flatlist}>
        <FlatList
          data={reservationData}
          renderItem={renderList}
          keyExtractor={item => item.id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

export default History;
