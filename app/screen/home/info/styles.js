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
  header_text: {
    color: 'black',
  },

  title: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  title_text: {
    color: 'black',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 144,
    marginBottom: 12,
    backgroundColor: 'white',
  },

  info_image_container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info_image: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  info_sign: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  history: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 120,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  history_item: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 12,
    color: 'black',
  },
});

export default styles;
