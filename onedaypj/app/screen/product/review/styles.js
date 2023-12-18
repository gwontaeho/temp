import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderColor: 'blue',
  },
  title: {
    height: 60,
    justifyContent: 'center',
  },

  datas: {
    width: '100%',
    padding: 6,
  },

  data: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 6,
  },

  img_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  img: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },

  review_text: {
    fontSize: 12,
    color: 'black',
  },

  empty: {
    width: '100%',
    height: 60,
    alignItems: 'center',
  },
  empty_text: {
    color: 'black',
  },
});

export default styles;
