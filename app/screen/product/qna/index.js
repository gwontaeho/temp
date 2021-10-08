import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import axios from '../../../axios';

import styles from './styles';

const Qna = props => {
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    requestData();
  }, [page]);

  const requestData = useCallback(async () => {
    try {
      const response = await axios.post('/api/qna/gett', {
        classId: props.classId,
        page,
      });

      console.log(response.data.result);
      setData(response.data.result);
      setEndPage(Math.ceil(response.data.count / 5));
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  const onPressPrev = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const onPressNext = useCallback(() => {
    if (endPage > page) setPage(page + 1);
  }, [endPage, page]);

  const dataList = data.map(v => {
    return (
      <View key={v.id} style={styles.data}>
        <View style={styles.question}>
          <Text>{v.userId}</Text>
          <Text>{v.createdAt.substr(0, 10)}</Text>
          <Text>{v.question}</Text>
        </View>
        {v.state === 0 ? null : (
          <View style={styles.answer}>
            <Text>{v.sellerId}</Text>
            <Text>{v.updatedAt.substr(0, 10)}</Text>
            <Text>{v.answer}</Text>
          </View>
        )}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.datas}>{dataList}</View>
      <View style={styles.nav}>
        <TouchableOpacity onPress={onPressPrev} style={styles.nav_item}>
          <Text>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNext} style={styles.nav_item}>
          <Text>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Qna;
