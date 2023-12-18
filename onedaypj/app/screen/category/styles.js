import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_space: {
    flex: 1,
    padding: 12,
  },

  sort: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 6,
  },
  sort_text: {
    fontSize: 10,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },

  contents: {
    flex: 1,
    paddingHorizontal: 6,
  },
  content: {
    width: '50%',
    padding: 6,
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
});

export default styles;
