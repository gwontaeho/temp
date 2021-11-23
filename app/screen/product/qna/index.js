import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {Divider} from 'react-native-paper';
import Profile from '../../../image/profile/profile.png';
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
      console.log(response.data);
      setQnaData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestCreateQna = useCallback(async () => {
    try {
      const response = await axios.post(
        '/api/qna',
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

  const dataList = qnaData.map(v => {
    return (
      <View key={v.id} style={styles.data}>
        <View style={styles.question}>
          <View style={styles.img_container}>
            <Image
              source={
                v.user.img === null
                  ? Profile
                  : {
                      uri:
                        'http://172.30.1.27:3005' +
                        v.user.img.replace(/\\/gi, '/').replace(/public/gi, ''),
                    }
              }
              style={styles.img}
            />
          </View>
          <View>
            <Text style={styles.qna_text}>{v.userId}</Text>
            <Text style={styles.qna_text}>{v.createdAt.substr(0, 10)}</Text>
            <Text style={styles.qna_text}>{v.question}</Text>
          </View>
        </View>
        {v.state === 0 ? null : (
          <View style={styles.answer}>
            <View style={styles.img_container}>
              <Image
                source={
                  v.seller.img === null
                    ? Profile
                    : {
                        uri:
                          'http://172.30.1.27:3005' +
                          v.seller.img
                            .replace(/\\/gi, '/')
                            .replace(/public/gi, ''),
                      }
                }
                style={styles.img}
              />
            </View>
            <View>
              <Text style={styles.qna_text}>{v.sellerId}</Text>
              <Text style={styles.qna_text}>{v.updatedAt.substr(0, 10)}</Text>
              <Text style={styles.qna_text}>{v.answer}</Text>
            </View>
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
          <Text style={styles.qna_text}>문의 작성하기</Text>
        </TouchableOpacity>
      </View>
      <View style={[{display: display}, styles.write_question]}>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          value={question}
          onChangeText={setQuestion}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={requestCreateQna}>
            <Text style={styles.qna_text}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDisplay('none')}>
            <Text style={styles.qna_text}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View style={styles.datas}>{dataList}</View>
    </View>
  );
};

export default Qna;
