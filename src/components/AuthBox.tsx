import React, {FC} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';
import useAuthStore from '../Store/AddAuth.ts';
import {useAuthDetailStore} from '../Store/AuthDetail.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

type RootStackParamList = {
  Home: undefined;
  AddAuth: undefined;
  OtpAuth: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AuthBoxProps {
  search: string;
}

const AuthBox: FC<AuthBoxProps> = ({search}) => {
  const auths = useAuthStore(state => state.auths);
  const setAuthDetail = useAuthDetailStore(state => state.setAuthDetail);
  const navigation = useNavigation<NavigationProp>();

  const goOtpAuth = (
    user: string,
    issuer: string,
    icon: string,
    secret: string,
  ) => {
    navigation.navigate('OtpAuth');
    setAuthDetail(user, issuer, icon, secret);
  };

  const filteredAuths = auths.filter(item =>
    item.issuer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView contentContainerStyle={style.scrollViewContent}>
      {filteredAuths.map((item, idx) => {
        return (
          <View key={idx} style={style.authCenter}>
            <TouchableOpacity
              style={style.authContainer}
              onPress={() =>
                goOtpAuth(
                  item.user,
                  item.issuer,
                  'https://cdn.brandfetch.io/revolut.com/w/400/h/400',
                  item.secret,
                )
              }>
              <Image
                source={{
                  uri: 'https://cdn.brandfetch.io/revolut.com/w/400/h/400',
                }}
                style={style.brandIcon}
              />
              <View style={style.authTextContainer}>
                <Text style={style.authMainText}>{item.issuer}</Text>
                <Text style={style.authSubText}>{item.user}</Text>
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
    fontFamily: 'Pretendard-Bold',
  },

  authSubText: {
    color: '#989898',
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
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
});

export default AuthBox;
