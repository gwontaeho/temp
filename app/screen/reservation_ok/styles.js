import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header_text: {
    fontSize: 20,
    color: 'black',
  },

  box: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  button: {
    width: 120,
    height: 50,
    display: 'flex',
    borderRadius: 12,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    color: 'black',
  },
  button_text: {
    color: 'white',
  },
});

export default styles;
