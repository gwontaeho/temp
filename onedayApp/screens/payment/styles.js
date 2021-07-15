import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'lightgreen',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  classInfo: {
    width: '100%',
    height: 120,
    borderWidth: 1,
  },
  image: {
    width: 120,
    height: 100,
  },
});

export default styles;
