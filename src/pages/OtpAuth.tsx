import React, { FC, useCallback, useRef } from "react";
import {StyleSheet, Text, View, Animated} from 'react-native';
import BottomSheetTab from '../components/BottomSheetTab.tsx';
import {RouteProp} from '@react-navigation/native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

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
        <AnimatedCircularProgress
          size={250}
          width={22}
          fill={0}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          duration={30000}
          prefill={0}
        />
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

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default OtpAuth;
