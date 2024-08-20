import {PixelRatio, Platform, Dimensions} from 'react-native';

const scale = Dimensions.get('screen').width / 320;

export default Normalize = size => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
