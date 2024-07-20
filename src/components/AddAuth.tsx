import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AddAuthProps {
  link: () => void;
}

const AddAuth: FC<AddAuthProps> = ({link}) => {
  return (
    <View>
      <TouchableOpacity onPress={link} style={style.addAuth}>
        <Icon name={'add-circle-outline'} size={25} color={'#BDBDBD'} />
        <Text style={style.textColor}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  addAuth: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 배경색에 투명도 적용
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textColor: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BDBDBD',
    marginLeft: 5,
  },
});

export default AddAuth;
