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
  },
  write: {
    padding: 12,
  },

  nav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav_item: {
    padding: 6,
    marginHorizontal: 12,
  },

  input: {
    borderWidth: 1,
    marginHorizontal: 12,
    borderRadius: 12,
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

  data: {
    padding: 12,
  },
  question: {
    padding: 12,
  },
  answer: {
    padding: 12,
    marginLeft: 24,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 6,
  },
});

export default styles;
