import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheetTab from '../components/BottomSheetTab.tsx';
import {RouteProp} from '@react-navigation/native';

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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{JSON.stringify(route.params)}</Text>
      <BottomSheetTab
        user={route.params.user}
        issuer={route.params.issuer}
        secret={route.params.secret}
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
});

export default OtpAuth;
