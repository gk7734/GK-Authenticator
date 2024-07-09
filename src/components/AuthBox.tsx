import React, {FC} from 'react';
import {data} from '../dummy/dummyJSON.ts';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AdIcon from 'react-native-vector-icons/AntDesign';

const AuthBox: FC = () => {
  return (
    <ScrollView contentContainerStyle={style.scrollViewContent}>
      {data.map((item, idx) => {
        return (
          <View key={idx} style={style.authCenter}>
            <TouchableOpacity style={style.authContainer}>
              <Image source={{uri: item.icon}} style={style.brandIcon} />
              <View style={style.authTextContainer}>
                <Text style={style.authMainText}>{item.title}</Text>
                <Text style={style.authSubText}>{item.email}</Text>
              </View>
              <AdIcon
                name={'right'}
                size={20}
                color={'#7C7C7C'}
                style={style.authArrowIcon}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  authContainer: {
    marginBottom: 10,
    width: '84.5%', // 고정 너비 대신 비율 사용
    height: 90, // 높이를 줄임
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15, // 아이콘과 텍스트 사이 간격
  },

  authTextContainer: {
    flex: 1, // 남은 공간을 차지하도록 설정
  },

  authMainText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },

  authSubText: {
    color: '#989898',
    fontSize: 12,
  },

  authArrowIcon: {
    marginLeft: 10, // 텍스트와 화살표 아이콘 사이 간격
  },

  authCenter: {
    marginTop: 15,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
})

export default AuthBox;
