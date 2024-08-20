import {Platform, ToastAndroid, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';

const ShowAlert = (message, isLong = false) => {
  if (Platform.OS == 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    // ToastAndroid.showWithGravityAndOffset(
    //   message,
    //   ToastAndroid.LONG,
    //   ToastAndroid.TOP,
    //   25,
    //   50,
    // );
  } else {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  }
};

export default ShowAlert;
