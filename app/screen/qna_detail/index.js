import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import axios from '../../axios';
import styles from './styles';

const QnaDetail = props => {
  const [qnaData, setQnaData] = useState({});

  useEffect(() => {
    console.log(props.route.params.id);
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/qna/detail',
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
      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return Object.keys(qnaData).length === 0 ? null : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>문의 상세</Text>
      </View>
      <Divider />
    </View>
  );
};

export default QnaDetail;
