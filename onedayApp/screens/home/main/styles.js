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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  classList: {
    width: '100%',
    height: 240,
    backgroundColor: 'lightgray',
    borderWidth: 1,
  },
  title: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  list: {
    width: '100%',
    paddingLeft: 12,
  },
  content: {
    width: 150,
    height: 240,
    paddingRight: 12,
  },
  image: {
    width: '100%',
    height: 120,
  },
});

export default styles;
