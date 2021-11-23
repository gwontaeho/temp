import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 12,
    padding: 6,
  },

  product_title: {
    height: 60,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  product_title_text: {
    color: 'black',
    fontSize: 15,
  },

  modal: {
    alignItems: 'center',
  },
  modal_header: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  month_item: {
    height: 60,
    width: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 12,
  },
  schedule_item: {
    height: 60,
    width: 96,
    borderWidth: 1,
    borderRadius: 12,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservation_button: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  personnel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
  },
  personnel_item: {
    padding: 12,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 9999,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_space: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    padding: 12,
  },

  image: {
    width: '100%',
    height: 300,
  },
  title: {
    height: 96,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginBottom: 6,
  },
  title_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  info: {
    backgroundColor: 'white',
    marginBottom: 6,
  },
  info_row: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
  },
  info_item: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info_text: {
    fontSize: 12,
    color: 'black',
  },

  btn: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  intro: {
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    marginBottom: 6,
    flexDirection: 'row',
    padding: 12,
  },
  intro_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro_image: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  intro_text: {
    color: 'black',
    fontSize: 12,
  },

  nav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6,
  },
  nav_item: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav_text: {
    fontSize: 12,
    color: 'black',
  },

  fab: {
    position: 'absolute',
    margin: 12,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(25, 118, 210, 0.7)',
  },
});

export default styles;
