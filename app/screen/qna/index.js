import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from '../../axios';
import styles from './styles';

const Qna = props => {
  const [visible, setVisible] = useState(false);

  const [state, setState] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [unanswered, setUnanswered] = useState([]);

  useEffect(() => {
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get('/api/qna/app', {
        headers: {token: props.route.params.token},
      });

      let answeredAry = [];
      let unansweredAry = [];

      response.data.forEach(e => {
        if (e.state === 1) {
          answeredAry.push(e);
        } else {
          unansweredAry.push(e);
        }
      });

      setAnswered(answeredAry);
      setUnanswered(unansweredAry);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPressDetail = useCallback(v => {
    console.log(v.id);
    props.navigation.navigate('QnaDetail', {
      token: props.route.params.token,
      id: v.id,
    });
  }, []);

  const openMenu = useCallback(() => setVisible(true), []);

  const closeMenu = useCallback(() => setVisible(false), []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.list_ymd}>
          <Text style={styles.list_text}>문의 일자 : </Text>
          <Text style={styles.list_text}>
            {item.createdAt.substr(0, 4) +
              '.' +
              item.createdAt.substr(5, 2) +
              '.' +
              item.createdAt.substr(8, 2)}
          </Text>
        </View>
        {item.state === 0 ? null : (
          <View style={styles.list_ymd}>
            <Text style={styles.list_text}>답변 일자 : </Text>
            <Text style={styles.list_text}>
              {item.updatedAt.substr(0, 4) +
                '.' +
                item.updatedAt.substr(5, 2) +
                '.' +
                item.updatedAt.substr(8, 2)}
            </Text>
          </View>
        )}

        <View style={styles.text}>
          <Text style={styles.list_text}>클래스 명 : </Text>
          <Text
            style={
              styles.list_text
            }>{`[${item.product.category}] ${item.product.name}`}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.list_text}>
            {item.state === 0 ? '미 답변' : '답변 완료'}
          </Text>
        </View>

        <TouchableOpacity onPress={() => onPressDetail(item)}>
          <Text style={styles.list_text}>자세히</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>문의 내역</Text>
      </View>
      <Divider />
      <View style={styles.menu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.menu_title}>
              <Text style={styles.header_text}>
                {state === 0 ? '미 답변 ' : '답변 완료'}
              </Text>
              <Icon name="chevron-down-outline" color="black" size={15} />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              setState(0);
              closeMenu();
            }}
            title="미 답변"
          />
          <Menu.Item
            onPress={() => {
              setState(1);
              closeMenu();
            }}
            title="답변 완료"
          />
        </Menu>
      </View>
      <Divider />

      <View style={styles.list}>
        <FlatList
          data={state === 0 ? unanswered : answered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Qna;
