import React, {FC, useCallback, useRef} from 'react';
import {StyleSheet, Text, View, Animated, Image} from 'react-native';
import BottomSheetTab from '../components/BottomSheetTab.tsx';
import {RouteProp} from '@react-navigation/native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import useAuthStore from '../Store/AddAuth.ts';

type RootStackParamList = {
  OtpAuth: {
    user: string;
    issuer: string;
    secret: string;
  };
};

type OtpAuthRouteProp = RouteProp<RootStackParamList, 'OtpAuth'>;

interface OtpAuthProps {
  route: OtpAuthRouteProp;
}

const OtpAuth: FC<OtpAuthProps> = ({route}) => {
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const timeRemaining = useAuthStore(state => state.timeRemaining);

  const circularProgressStyle = {
    transform: [
      {
        translateY: animatedPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [150, 0], // 조정 가능한 값
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
        <View
          style={{
            justifyContent: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            top: 65,
          }}>
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
          tintColor={'#292929'} // 진행 바 색상
          backgroundColor={'#FCE18B'} // 남 부분 색상
          backgroundWidth={10}
          lineCap={'round'}
          duration={1000}
        />
        <Text style={styles.boldText}>{timeRemaining}</Text>
        <Text style={styles.normalText}>Seconds</Text>
      </Animated.View>
      <BottomSheetTab
        user={route.params.user}
        issuer={route.params.issuer}
        secret={route.params.secret}
        onPositionChange={handleSheetPositionChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBCE58',
  },

  text: {
    color: 'black',
  },

  boldText: {
    marginTop: 10,
    fontSize: 28,
    letterSpacing: 1,
    fontWeight: '800',
    color: '#292929',
  },

  normalText: {
    fontSize: 15,
    color: '#292929',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  brandIcon: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 100,
  },
});

export default OtpAuth;
