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
  },
  innerContainer: {
    width: '100%',
    height: '100%',
  },
  banner: {
    width: '100%',
    height: 180,
    backgroundColor: 'ivory',
  },
  categories: {
    width: '100%',
    height: 120,
    display: 'flex',
    flexDirection: 'row',
  },
  category: {
    flex: 1,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popular: {
    width: '100%',
    height: 180,
    backgroundColor: 'lightgray',
  },
  newly: {
    width: '100%',
    height: 180,
    backgroundColor: 'lightgreen',
  },
});

export default styles;
