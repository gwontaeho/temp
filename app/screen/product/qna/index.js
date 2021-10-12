import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Divider} from 'react-native-paper';

import axios from '../../../axios';

import styles from './styles';

const Qna = props => {
  const [qnaData, setQnaData] = useState([]);
  const [question, setQuestion] = useState('');
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    requestQnaData();
    console.log(props.user.token);
  }, []);

  const requestQnaData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/qna?productId=${props.productId}`);

      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestCreateQna = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/qna/question',
        {
          question,
          sellerId: props.sellerId,
          productId: props.productId,
        },
        {headers: {token: props.user.token}},
      );
      setDisplay('none');
      setQuestion('');
      requestQnaData();
    } catch (error) {
      console.log(error);
    }
  }, [question]);

  const onPressCreate = useCallback(() => {
    console.log(question);
  }, [question]);

  const dataList = qnaData.map(v => {
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.write}
          onPress={() => setDisplay('flex')}>
          <Text>문의 작성하기</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: display}}>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          value={question}
          onChangeText={setQuestion}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={requestCreateQna}>
            <Text>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDisplay('none')}>
            <Text>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View style={styles.datas}>{dataList}</View>
    </View>
  );
};

export default Qna;
