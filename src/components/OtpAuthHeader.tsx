import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MtIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

type RootStackParamList = {
  Home: undefined;
  AddAuth: undefined;
  OtpAuth: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OtpAuthHeader: FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const goAddAuthPage = () => {
    navigation.navigate('AddAuth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'chevron-back'} size={28} color={'#292929'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goAddAuthPage}>
          <MtIcon name={'qrcode-scan'} size={20} color={'#292929'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 50,
    backgroundColor: '#FBCE58',
  },

  flex: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default OtpAuthHeader;
