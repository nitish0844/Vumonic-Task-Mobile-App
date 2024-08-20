import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, sizes} from '../../themes/ThemePath';
import Normalize from './Normalize';

export default function Loader(props) {
  return props.visible ? (
    <View
      style={{
        width: sizes.width,
        height: sizes.height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};
