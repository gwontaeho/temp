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
  },
  innerContainer: {
    flex: 1,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    width: '100%',
    padding: 12,
  },
  name: {
    width: '100%',
    height: 60,
    borderWidth: 1,
  },
  nav: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
  },
  navTitle: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  modalContainer: {
    flex: 1,
  },
  modalTitle: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  modalContent: {
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  modalCalendar: {
    flex: 1,
  },
  modalDate: {
    width: '100%',
    height: 60,
    borderWidth: 1,
  },
  schedules: {
    width: '100%',
    height: 120,
    borderWidth: 1,
  },
  personnel: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  howManyPeople: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  howManyPeopleItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: 36,
    marginLeft: 12,
  },
});

export default styles;
