import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size =>
  Math.round(
    PixelRatio.roundToNearestPixel((width / guidelineBaseWidth) * size),
  );
const verticalScale = size =>
  Math.round(
    PixelRatio.roundToNearestPixel((height / guidelineBaseHeight) * size),
  );
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};
