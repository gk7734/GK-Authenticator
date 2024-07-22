import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Logo from '../Logo';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  AddAuth: undefined;
  OtpAuth: undefined;
  Setting: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AppHeader: FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.header}>
      <View style={styles.view}>
        <TouchableOpacity>
          <Logo size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.view_flex}>
        <TouchableOpacity>
          <Icon name={'moon'} size={26} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Icon name={'settings'} size={26} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    height: 50,
    justifyContent: 'space-between',
    elevation: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
  },

  view: {
    marginTop: 5,
    alignItems: 'center',
  },

  view_flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
