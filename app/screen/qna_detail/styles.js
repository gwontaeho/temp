import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'white',
  },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    color: 'black',
  },

  data: {
    width: '100%',
    padding: 12,
  },
  item: {
    marginBottom: 12,
  },

  qna: {
    padding: 12,
    borderWidth: 1,
    minHeight: 120,
    borderRadius: 12,
    borderColor: '#1976d2',
    marginBottom: 12,
  },
  text: {
    color: 'black',
    fontSize: 12,
  },
});

export default styles;
