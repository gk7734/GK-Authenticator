import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SettingsHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name={'chevron-back'} size={35} color="#BDBDBD" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.mainText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  mainText: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'Pretendard-Regular',
    color: '#7C7C7C',
  },
});

export default SettingsHeader;
