import React, {useCallback, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {View, Button} from 'native-base';

export const Message = ({navigation}) => {
  useEffect(() => {
    // const onValueChange = database()
    //   .ref('/users/1')
    //   .on('value', snapshot => {
    //     console.log(snapshot.val());
    //   });
    // return () => database().ref('/rooms').off('value', onValueChange);
  }, []);

  const handlePress = useCallback(async () => {
    const ref = database().ref('/users/1/2');
    const value = await ref.once('value');
    if (value.val()) {
      // 방이름
      const room = value.val();
      navigation.navigate('Room', {room});
      console.log(room);
    } else {
      const result = database().ref('/rooms').push({user1: '1', user2: '2'});
      database().ref('/users/1/2').set(result.key);
      database().ref('/users/2/1').set(result.key);
    }

    // database().ref('/users/1').set('');

    // database().ref('/users/1/rooms/2').set('');
    // database().ref('/users/2/rooms/1').set('');
    // database().ref('/rooms').push('2');
  }, []);

  const test = useCallback(() => {
    database()
      .ref('/users/1')
      .once('value')
      .then(snapshot => {
        snapshot.forEach(a => console.log(a.val()));
      });
    // database()
    //   .ref('/users/1')
    //   .once('value')
    //   .then(snapshot => {
    //     console.log(snapshot.val());
    //   });
  }, []);

  return (
    <View>
      <Button onPress={handlePress}>메시지 보내기</Button>
      <Button onPress={test}>test</Button>
    </View>
  );
};
