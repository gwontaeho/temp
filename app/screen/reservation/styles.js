import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_reservation: {
    position: 'absolute',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    backgroundColor: 'ivory',
    zIndex: 1,
  },

  scrollview: {
    paddingHorizontal: 12,
  },

  title: {
    height: 60,
    justifyContent: 'center',
  },
  user: {
    marginBottom: 12,
  },
  class: {
    marginBottom: 12,
  },
  schedule: {
    marginBottom: 12,
  },
});

export default styles;
