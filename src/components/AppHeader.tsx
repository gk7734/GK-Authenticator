import React, {FC} from 'react';
import {Surface} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Logo from './Logo.tsx';

const AppHeader: FC = () => {
  return (
    <View style={style.header}>
      <View style={style.view}>
        <TouchableOpacity>
          <Logo />
        </TouchableOpacity>
      </View>
      <View style={style.view_flex}>
        <TouchableOpacity>
          <Icon name={'moon'} size={26} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'settings'} size={26} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const style = StyleSheet.create({
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
