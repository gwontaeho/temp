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

  banner: {
    width: '100%',
    height: 180,
    backgroundColor: 'ivory',
  },

  categories: {
    width: '100%',
    display: 'flex',
    borderWidth: 1,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  category: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },

  classList: {
    width: '100%',
    backgroundColor: 'lightgray',
    borderWidth: 1,
  },
  title: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 24,
  },
  list: {
    width: '100%',
    paddingLeft: 12,
  },
  content: {
    width: 156,
    paddingRight: 12,
  },
  content_image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  content_address: {
    position: 'absolute',
    bottom: 48,
    color: 'white',
  },
  content_text: {
    height: 24,
    lineHeight: 24,
    fontSize: 10,
    paddingLeft: 12,
  },
});

export default styles;
