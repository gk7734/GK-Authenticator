import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/Home.tsx';
import AppHeader from './src/components/AppHeader.tsx';
import Add from './src/pages/Add.tsx';
import Toast from 'react-native-toast-message';
import QRHeader from './src/components/QRHeader.tsx';

const Stack = createStackNavigator();

export const App: FC = () => {
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
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};
