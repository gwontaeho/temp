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
    backgroundColor: 'white',
  },
  logo_image: {
    height: '100%',
    width: '30%',
  },

  banner: {
    width: '100%',
    height: 180,
  },
  banner_image: {
    width: '100%',
    height: '100%',
  },

  categories: {
    backgroundColor: 'white',
    paddingVertical: 12,
    width: '100%',
    display: 'flex',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 72,
  },
  row_all: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    flexDirection: 'row',
  },

  category: {
    padding: 6,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category_image: {
    width: 36,
    height: 36,
  },
  category_text: {
    fontSize: 12,
    color: 'black',
  },

  classList: {
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 12,
  },
  title: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 24,
  },
  title_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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
    bottom: 0,
  },
  content_view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  content_text: {
    fontSize: 10,
  },
  content_price: {
    fontSize: 13,
    color: 'black',
  },

  footer: {
    width: '100%',
    height: 120,
  },
});

export default styles;
