import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import axios from '../../axios';
import styles from './styles';

const HistoryDetail = props => {
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    console.log(props.route.params.id);
    requestHistoryData();
  }, []);

  const requestHistoryData = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/reservation/user/detail',
        {
          id: props.route.params.id,
        },
        {
          headers: {
            token: props.route.params.user.token,
          },
        },
      );
      console.log(response.data);
      setHistoryData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return Object.keys(historyData).length === 0 ? null : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>예약 상세</Text>
      </View>
      <Divider />
      <View>
        <Text>클래스 명 : {historyData.name}</Text>
        <Text>
          수강 일자 :{' '}
          {String(historyData.schedule.ymd).substr(0, 4) +
            '.' +
            String(historyData.schedule.ymd).substr(4, 2) +
            '.' +
            String(historyData.schedule.ymd).substr(6, 2) +
            ' / ' +
            historyData.schedule.start.substr(0, 2) +
            ':' +
            historyData.schedule.start.substr(2, 2) +
            '~' +
            historyData.schedule.end.substr(0, 2) +
            ':' +
            historyData.schedule.end.substr(2, 2)}
        </Text>
        <Text>
          예약 일자 :{' '}
          {historyData.createdAt.substr(0, 4) +
            '.' +
            historyData.createdAt.substr(5, 2) +
            '.' +
            historyData.createdAt.substr(8, 2)}
        </Text>
        <Text>총 수강 인원 : {historyData.schedule.personnel}</Text>
        <Text>예약 인원 : {historyData.personnel}</Text>
        <Text>예약 상태 : {historyData.state}</Text>
      </View>
    </View>
  );
};

export default HistoryDetail;
