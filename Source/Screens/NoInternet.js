import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const NoInternet = () => {
  return (
    <LottieView
      source={require('../Assets/Loaders/NoInternet/No Internet.json')}
      autoPlay
      loop
      style={{
        width: 300,
        height: 300,
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};

export default NoInternet;
