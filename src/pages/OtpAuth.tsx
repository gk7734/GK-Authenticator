import React, {FC, useCallback, useRef} from 'react';
import {StyleSheet, Text, View, Animated, Image} from 'react-native';
import BottomSheetTab from '../components/BottomSheetTab.tsx';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import useAuthStore from '../Store/AddAuth.ts';
import DeleteModal from '../components/DelateModal.tsx';

const OtpAuth: FC = () => {
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const timeRemaining = useAuthStore(state => state.timeRemaining);

  const circularProgressStyle = {
    transform: [
      {
        translateY: animatedPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [150, 0],
        }),
      },
    ],
  };

  const handleSheetPositionChange = useCallback(
    (position: number) => {
      Animated.spring(animatedPosition, {
        toValue: position,
        useNativeDriver: true,
      }).start();
    },
    [animatedPosition],
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.center, circularProgressStyle]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn.brandfetch.io/revolut.com/w/400/h/400',
            }}
            style={styles.brandIcon}
          />
        </View>
        <AnimatedCircularProgress
          size={250}
          width={16}
          fill={(timeRemaining / 30) * 100}
          padding={20}
          tintColor={'#292929'}
          backgroundColor={'#FCE18B'}
          backgroundWidth={10}
          lineCap={'round'}
          duration={1000}
        />
        <Text style={styles.boldText}>{timeRemaining}</Text>
        <Text style={styles.normalText}>Seconds</Text>
      </Animated.View>
      <BottomSheetTab onPositionChange={handleSheetPositionChange} />
      <DeleteModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBCE58',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 65,
  },
  boldText: {
    marginTop: 10,
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    letterSpacing: 1,
    color: '#292929',
  },
  normalText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: '#292929',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  brandIcon: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 100,
  },
});

export default OtpAuth;
