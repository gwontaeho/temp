import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    height: 60,
    justifyContent: 'center',
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
