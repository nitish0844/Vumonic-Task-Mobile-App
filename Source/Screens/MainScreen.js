import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Normalize from '../../utils/helper/Normalize';
import MyCarousel from './Courosal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUserEmail, setAppCode} from '../Components/Redux/Action';
import CookieManager from '@react-native-cookies/cookies';

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await CookieManager.clearAll();
    await dispatch(setUserEmail(''));
    await dispatch(setAppCode(''));

    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('AppCode');

    navigation.reset({
      index: 0,
      routes: [{name: 'GoogleLogin'}],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        gap: Normalize(20),
        padding: Normalize(20),
        position: 'relative',
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: Normalize(10),
          right: Normalize(10),
          zIndex: 1,
        }}
        onPress={handleLogout}>
        <Ionicons name="log-out" size={Normalize(30)} color="#000" />
      </TouchableOpacity>
      <MyCarousel />
      <Button
        title="Get Email"
        onPress={() => navigation.navigate('GetEmailScreen')}
      />
    </View>
  );
};

export default MainScreen;
