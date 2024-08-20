import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Normalize from '../../../utils/helper/Normalize';

const MainLoader = () => {
  return (
    <LottieView
      source={require('../../Assets/Loaders/MainLoader/MainLoader.json')}
      autoPlay
      loop
      style={{
        width: Normalize(300),
        height: Normalize(300),
      }}
    />
  );
};

export default MainLoader;
