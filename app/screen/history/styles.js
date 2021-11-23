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

  menu: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'white',
  },
  menu_title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatlist: {
    paddingHorizontal: 12,
    flex: 1,
  },

  list_item: {
    backgroundColor: 'white',
    paddingBottom: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  list_item_img_container: {
    flex: 2,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_item_img: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  list_item_texts: {
    flex: 3,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  list_item_info: {
    flexDirection: 'row',
  },
  list_item_ymd: {
    height: 24,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 12,
  },
});

export default styles;
