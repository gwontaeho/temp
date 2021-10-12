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
  },

  menu: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatlist: {
    padding: 12,
    flex: 1,
  },

  list_item: {
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  list_item_info: {
    flexDirection: 'row',
  },
  list_item_ymd: {
    height: 60,
    justifyContent: 'center',
  },
  list_item_img: {
    width: 100,
    height: 100,
  },
  list_item_texts: {
    paddingLeft: 12,
    justifyContent: 'center',
  },
});

export default styles;
