import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const QRHeader: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.icon} onPress={() => navigation.goBack()}>
        <Icon name={'chevron-back'} size={30} color={'black'} />
      </TouchableOpacity>
      <Text style={style.text}>Add Account</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    gap: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FBCE58',
  },

  icon: {
    marginLeft: 15,
  },

  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
});

export default QRHeader;
