import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/Home.tsx';
import AppHeader from './src/components/AppHeader.tsx';
import Add from './src/pages/Add.tsx';
import Toast from 'react-native-toast-message';
import QRHeader from './src/components/QRHeader.tsx';
import OtpAuth from './src/pages/OtpAuth.tsx';
import OtpAuthHeader from './src/components/OtpAuthHeader.tsx';
import useAuthStore from './src/Store/AddAuth.ts';
import {
  checkBiometrics,
  loginWithBiometrics,
} from './src/Typescript/utils/BiometricsUtils.tsx';
import {BiometryTypes} from 'react-native-biometrics';
import {
  AppState,
  AppStateStatus,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from './src/components/Logo.tsx';

const Stack = createStackNavigator();

export const App = () => {
  const {generateOTP, setTimeRemaining} = useAuthStore();
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);

  const updateTimeRemaining = useCallback(() => {
    const now = new Date();
    const secondsPassed = now.getSeconds();
    const newTimeRemaining = 30 - (secondsPassed % 30);
    setTimeRemaining(newTimeRemaining);

    if (newTimeRemaining === 30 || newTimeRemaining === 0) {
      generateOTP();
    }
  }, [generateOTP, setTimeRemaining]);

  useEffect(() => {
    updateTimeRemaining(); // 초기 실행

    const intervalId = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [updateTimeRemaining]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateListener.remove();
    };
  });

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      onAppReturn();
    }
  };

  const onAppReturn = () => {
    setBiometricAuthenticated(false);
    authenticateBiometrics();
  };

  const authenticateBiometrics = async (): Promise<void> => {
    const biometryType = await checkBiometrics();
    if (biometryType === BiometryTypes.Biometrics) {
      const userId: string = 'preStartUser';
      const result: boolean | null = await loginWithBiometrics(userId);

      if (result) {
        setBiometricAuthenticated(true);

      } else {
        console.log('Biometric authentication failed');
        setBiometricAuthenticated(false);
      }
    } else {
      setBiometricAuthenticated(false);
    }
  };

  return (
    <>
      {biometricAuthenticated ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: true, header: () => <AppHeader />}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="AddAuth"
              component={Add}
              options={{headerShown: true, header: () => <QRHeader />}}
            />
            <Stack.Screen
              name="OtpAuth"
              component={OtpAuth}
              options={{header: () => <OtpAuthHeader />}}
            />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      ) : (
        <View style={styles.biometricsContainer}>
          <View />
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Logo size={120} />
            <Text style={styles.mainText}>GK Auth 잠김</Text>
          </View>
          <TouchableOpacity
            style={styles.subTextContainer}
            onPress={authenticateBiometrics}>
            <Text style={styles.subText}>잠금 해재</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  biometricsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between', // 콘텐츠와 하단 텍스트 사이의 공간 분배
    alignItems: 'center',
    backgroundColor: 'white',
  },

  logo: {
    width: 200,
    height: 200,
  },

  mainText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#1E90FF',
  },

  subTextContainer: {
    marginBottom: 20, // 하단 여백 추가
  },

  subText: {
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#1E90FF',
    fontSize: 14,
    marginBottom: 40,
  },
});
