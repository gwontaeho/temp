import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header_text: {
    color: 'black',
  },

  menu: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menu_title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
  list_item: {
    width: '100%',
    padding: 12,
    backgroundColor: 'white',
    marginTop: 12,
    borderRadius: 12,
  },
  list_ymd: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  list_text: {
    color: 'black',
    fontSize: 12,
  },
  text: {
    marginBottom: 12,
  },
});

export default styles;
