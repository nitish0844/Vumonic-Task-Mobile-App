import {StyleSheet, Platform, StatusBar} from 'react-native';
console.log(StatusBar.currentHeight, 'StatusBar.currentHeight');
export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
