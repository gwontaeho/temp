import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import axios from '../../axios';
import styles from './styles';

const History = props => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('예약 중');
  const [waiting, setWaiting] = useState([]);
  const [ing, setIng] = useState([]);
  const [past, setPast] = useState([]);
  const [request, setRequest] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    requesetHistoryData();
  }, []);

  const requesetHistoryData = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/reservation/user',
        {},
        {
          headers: {
            token: props.route.params.user.token,
          },
        },
      );
      let newWaiting = [];
      let newIng = [];
      let newPast = [];
      let newRequest = [];
      let newCancled = [];
      response.data.map(v => {
        if (v.state === 0) {
          newIng.push(v);
        } else if (v.state === 1) {
          newPast.push(v);
        } else if (v.state === 2) {
          newRequest.push(v);
        } else if (v.state === 3) {
          newCancled.push(v);
        } else if (v.state === 4) {
          newWaiting.push(v);
        }
      });
      setWaiting(newWaiting);
      setIng(newIng);
      setPast(newPast);
      setRequest(newRequest);
      setCanceled(newCancled);
      setSelected(newWaiting);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickState = useCallback(
    v => {
      if (v === 0) {
        setState('예약 중');
        setSelected(ing);
      } else if (v === 1) {
        setState('수강 완료');
        setSelected(past);
      } else if (v === 2) {
        setState('취소 요청');
        setSelected(request);
      } else if (v === 3) {
        setState('예약 취소');
        setSelected(canceled);
      } else if (v === 4) {
        setState('예약 대기');
        setSelected(waiting);
      }
      closeMenu();
    },
    [ing, past, request, canceled, waiting],
  );

  const onPressItem = useCallback(v => {
    props.navigation.navigate('HistoryDetail', {
      user: props.route.params.user,
      id: v,
    });
  }, []);

  const openMenu = useCallback(() => setVisible(true), []);

  const closeMenu = useCallback(() => setVisible(false), []);

  const renderList = ({item}) => {
    const uri =
      'http://172.30.1.27:3005' +
      item.product.img.replace(/\\/gi, '/').replace(/public/gi, '');
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item.id)}
        style={styles.list_item}>
        <View style={styles.list_item_ymd}>
          <Text>
            {item.createdAt.substr(0, 4) +
              '.' +
              item.createdAt.substr(5, 2) +
              '.' +
              item.createdAt.substr(8, 2)}
          </Text>
        </View>
        <View style={styles.list_item_info}>
          <Image
            source={{
              uri,
            }}
            style={styles.list_item_img}
          />
          <View style={styles.list_item_texts}>
            <Text>{item.state}</Text>
            <Text>{item.product.name}</Text>
          </View>
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
            <TouchableOpacity onPress={openMenu}>
              <Text>{state}</Text>
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              onClickState(4);
            }}
            title="예약 대기"
          />
          <Menu.Item
            onPress={() => {
              onClickState(0);
            }}
            title="예약 중"
          />
          <Menu.Item
            onPress={() => {
              onClickState(1);
            }}
            title="수강 완료"
          />
          <Menu.Item
            onPress={() => {
              onClickState(2);
            }}
            title="취소 요청"
          />
          <Menu.Item
            onPress={() => {
              onClickState(3);
            }}
            title="취소"
          />
        </Menu>
      </View>
      <Divider />

      <View style={styles.flatlist}>
        <FlatList
          data={selected}
          renderItem={renderList}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default History;
