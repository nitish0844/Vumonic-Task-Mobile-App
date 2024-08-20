import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import GetEmailUI from '../Components/GetEmail/GetEmailUI';
import GetEmailAppCode from '../Components/GetEmail/GetEmailAppCode';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setAppCode, setUserEmail} from '../Components/Redux/Action';

const GetEmailScreen = () => {
  const AppCode = useSelector(state => state.AppCode);
  const userEmail = useSelector(state => state.userEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const UserEmailValue = await AsyncStorage.getItem('email');
      const AppCodeAsyncValue = await AsyncStorage.getItem('AppCode');

      if (UserEmailValue && AppCodeAsyncValue) {
        dispatch(setAppCode(AppCodeAsyncValue));
        dispatch(setUserEmail(UserEmailValue));
      }
    })();
  }, []);

  return <>{AppCode && userEmail ? <GetEmailUI /> : <GetEmailAppCode />}</>;
};

export default GetEmailScreen;
