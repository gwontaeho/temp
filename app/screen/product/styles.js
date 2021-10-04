import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_space: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
  },

  image: {
    width: '100%',
    height: 300,
  },
  title: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 12,
  },

  nav: {
    flexDirection: 'row',
  },
  nav_item: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
