import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Divider, FAB, Modal, Portal, Provider} from 'react-native-paper';
import axios from '../../axios';

import styles from './styles';

import Detail from './detail';
import Review from './review';
import Qna from './qna';

const Product = props => {
  const today = new Date();
  const todayYmd =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? '0' + String(today.getMonth() + 1)
        : String(today.getMonth() + 1),
    ) +
    String(
      today.getDate() + 1 < 10
        ? '0' + String(today.getDate())
        : String(today.getDate()),
    );

  const [classData, setClassData] = useState({});
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);

  let scrollViewRef = useRef();

  useEffect(() => {
    requestClassData();
    requestSchedule();
  }, []);

  const requestClassData = useCallback(async () => {
    try {
      const response = await axios.post('/api/classes/product', {
        id: props.route.params.id,
      });
      setClassData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestSchedule = useCallback(async () => {
    try {
      const response = await axios.post('/api/schedule/product', {
        classId: props.route.params.id,
        ymd: Number(todayYmd),
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const category = useCallback(v => {
    switch (v) {
      case 'all':
        return '[전체] ';
      case 'flower':
        return '[플라워] ';
      case 'art':
        return '[미술] ';
      case 'cooking':
        return '[요리] ';
      case 'handmade':
        return '[수공예] ';
      case 'activity':
        return '[액티비티] ';
      case 'etc':
        return '[기타] ';
    }
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return Object.keys(classData).length === 0 ? null : (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={styles.modal}
          contentContainerStyle={styles.containerStyle}>
          <FlatList />
        </Modal>
      </Portal>
      <View style={styles.header}>
        <View style={styles.header_space}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header_space}>
          <TouchableOpacity
            onPress={() => scrollViewRef.current.scrollTo({y: 0})}>
            <Text>위로</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FAB style={styles.fab} small label="신청하기" onPress={showModal} />
      <ScrollView ref={scrollViewRef}>
        <Image
          source={{
            uri:
              'http://172.30.1.27:3005' +
              classData.img.replace(/\\/gi, '/').replace(/public/gi, ''),
          }}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text>{category(classData.category) + classData.name}</Text>
        </View>
        <Divider />
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(0)}>
            <Text>정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(1)}>
            <Text>후기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_item}
            onPress={() => setSelected(2)}>
            <Text>문의</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        {selected === 0 ? (
          <Detail details={classData.detail} />
        ) : selected === 1 ? (
          <Review />
        ) : (
          <Qna classId={classData.id} />
        )}
      </ScrollView>
    </View>
  );
};

export default Product;
