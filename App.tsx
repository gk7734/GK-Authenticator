import React, {FC, useCallback, useEffect, useState} from 'react';
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

const Stack = createStackNavigator();

export const App: FC = () => {
  const {generateOTP, setTimeRemaining} = useAuthStore();

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

  return (
    <>
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
      </NavigationContainer>
      <Toast />
    </>
  );
};
