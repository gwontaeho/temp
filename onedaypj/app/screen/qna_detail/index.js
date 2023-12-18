import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import axios from '../../axios';
import styles from './styles';

const QnaDetail = props => {
  const [qnaData, setQnaData] = useState({});

  useEffect(() => {
    console.log(props.route.params);
    requestQnaData();
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/qna/${props.route.params.id}`, {
        headers: {
          token: props.route.params.token,
        },
      });
      console.log(response.data);
      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return Object.keys(qnaData).length === 0 ? null : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>문의 상세</Text>
      </View>
      <Divider />
      <View style={styles.data}>
        <View style={styles.item}>
          <Text style={styles.text}>{`문의 일자 : ${
            qnaData.createdAt.substr(0, 4) +
            '.' +
            qnaData.createdAt.substr(5, 2) +
            '.' +
            qnaData.createdAt.substr(8, 2)
          }`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>{`답변 상태 : ${
            qnaData.state === 0 ? '미 답변' : '답변 완료'
          }`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>클래스 명 :</Text>
          <Text
            style={
              styles.text
            }>{`[${qnaData.product.category}] ${qnaData.product.name}`}</Text>
        </View>
        <View style={styles.qna}>
          <Text style={styles.text}>문의 내용 : </Text>
          <Text style={styles.text}>{qnaData.question}</Text>
        </View>
        {qnaData.answer === null ? null : (
          <View style={styles.qna}>
            <Text style={styles.text}>문의 답변 : </Text>
            <Text style={styles.text}>{qnaData.answer}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default QnaDetail;
