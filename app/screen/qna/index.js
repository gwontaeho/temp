import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import axios from '../../axios';

import styles from './styles';

const Qna = props => {
  const [qnaData, setQnaData] = useState([]);

  useEffect(() => {
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/qna/app/user',
        {},
        {
          headers: {
            token: props.route.params.user.token,
          },
        },
      );
      setQnaData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPressDetail = useCallback(v => {
    console.log(v.id);
    props.navigation.navigate('QnaDetail', {
      user: props.route.params.user,
      id: v.id,
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.header}>
          <Text style={styles.list_item_ymd}>
            {item.createdAt.substr(0, 4) +
              '.' +
              item.createdAt.substr(5, 2) +
              '.' +
              item.createdAt.substr(8, 2)}
          </Text>
        </View>
        <View>
          <Text>{item.product.name}</Text>
        </View>
        <View>
          <Text>{item.state === 0 ? '미 답변' : '답변 완료'}</Text>
        </View>
        <View>
          <Text>{item.question}</Text>
        </View>
        <TouchableOpacity onPress={() => onPressDetail(item)}>
          <Text>상세</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>문의 내역</Text>
      </View>

      <FlatList
        data={qnaData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Qna;
