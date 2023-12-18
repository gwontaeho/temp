import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  write: {
    padding: 12,
  },
  write_question: {
    backgroundColor: 'white',
  },

  input: {
    borderWidth: 1,
    marginHorizontal: 12,
    borderRadius: 12,
    borderColor: '#1976d2',
    padding: 12,
  },
  buttons: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 12,
  },
  button: {
    marginLeft: 12,
    padding: 12,
  },

  datas: {
    padding: 6,
  },
  data: {
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 6,
    borderRadius: 12,
  },
  question: {
    padding: 12,
    flexDirection: 'row',
  },
  answer: {
    flexDirection: 'row',
    padding: 12,
    marginLeft: 24,
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 6,
  },

  qna_text: {
    fontSize: 12,
    color: 'black',
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
});

export default styles;
