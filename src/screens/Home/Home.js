import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

export const Home = () => {
  const [visible, setVisible] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'custom',
      text1: 'Hello',
      text2: 'This is some something 👋',
      position: 'bottom',
    });
  };

  return (
    <View>
      <View>
        <Text>home</Text>
        <Pressable onPress={() => setVisible(true)}>
          <Text>모달</Text>
        </Pressable>

        <Pressable onPress={() => showToast()}>
          <Text>토스트</Text>
        </Pressable>
      </View>

      <Modal isVisible={visible} style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setVisible(false)}>
            <Text>asd</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
