import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    flex: 1,
    paddingHorizontal: 6,
  },
  content: {
    width: '50%',
    height: 200,
    padding: 6,
  },
  image: {
    width: '100%',
    height: 100,
  },
});

export default styles;
