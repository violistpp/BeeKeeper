/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Animated} from 'react-native';

const BeeWorks = () => {
  const loadingSpin = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(1)).current;
  const [beeDirection, setBeeDirection] = useState(true);

  function spinAnimation() {
    Animated.sequence([
      Animated.timing(loadingSpin, {
        toValue: beeDirection ? 1 : 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnimation, {
        toValue: beeDirection ? 0 : 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => setBeeDirection(!beeDirection));
  }

  useEffect(() => {
    spinAnimation();
  }, [beeDirection]);

  return (
    <Animated.View
      style={[
        styles.loadingContainer,
        {
          transform: [
            {
              rotate: loadingSpin.interpolate({
                inputRange: [0, 1],
                outputRange: ['180deg', '360deg'],
              }),
            },
          ],
        },
      ]}>
      <Animated.Image
        style={[
          styles.loadingImage,
          {
            transform: [
              {
                rotate: rotateAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          },
        ]}
        source={require('./../assets/images/bee_image.png')}
      />
    </Animated.View>
  );
};

export default BeeWorks;

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    paddingLeft: 180,
  },
  loadingImage: {
    width: 70,
    height: 70,
  },
});
