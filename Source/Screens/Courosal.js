import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Normalize from '../../utils/helper/Normalize';
import {useNavigation} from '@react-navigation/native';
import MainLoader from '../Components/Loader/MainLoader';

const image1 = require('../Assets/Images/Carousel/BeautifulLandscape.jpg');
const image2 = require('../Assets/Images/Carousel/City.jpg');
const image3 = require('../Assets/Images/Carousel/Mountain.jpg');

const {width: screenWidth} = Dimensions.get('window');

const data = [
  {
    title: 'Beautiful Landscape',
    thumbnail: image1,
  },
  {
    title: 'City View',
    thumbnail: image2,
  },
  {
    title: 'Mountain',
    thumbnail: image3,
  },
];

const MyCarousel = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const _renderItem = ({item}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.thumbnail}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <>
      {/* <TouchableOpacity
        style={{padding: Normalize(10)}}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-circle"
          size={Normalize(40)}
          color={'#000'}
        />
      </TouchableOpacity> */}
      {loading ? (
        <MainLoader />
      ) : (
        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: Normalize(20),
          }}>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={Normalize(270)}
            data={data}
            renderItem={_renderItem}
            hasParallaxImages={true}
            loop={true}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: Normalize(270),
    height: Normalize(270),
    paddingBottom: Normalize(10),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    padding: Normalize(10),
    fontSize: Normalize(16),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MyCarousel;
