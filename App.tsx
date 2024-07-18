import React, {FC, useEffect} from 'react';
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
  const {timeRemaining, generateOTP, setTimeRemaining} = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsPassed = new Date().getSeconds();
      const newTimeRemaining = 30 - (secondsPassed % 30);

      if (newTimeRemaining === 30 || timeRemaining === 0) {
        generateOTP();
      }

      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  });

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
