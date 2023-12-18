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

  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
  list_item: {
    marginTop: 12,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
  },
  list_item_text: {
    marginBottom: 12,
  },

  text: {
    fontSize: 12,
    color: 'black',
  },
});

export default styles;
