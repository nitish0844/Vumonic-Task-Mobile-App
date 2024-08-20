import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import MyCarousel from '../../Screens/Courosal';
import GetEmailScreen from '../../Screens/GetEmailScreen';
import MainScreen from '../../Screens/MainScreen';
import GoogleLogin from '../../Screens/Auth';
import WebViewPage from '../Auth/WebView';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GoogleLogin"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Courosal" component={MyCarousel} />
        <Stack.Screen name="GetEmailScreen" component={GetEmailScreen} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
        <Stack.Screen name="WebViewPage" component={WebViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
