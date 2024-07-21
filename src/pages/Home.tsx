import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useRef} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import FIcon from 'react-native-vector-icons/Feather';
import MtIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthBox from '../components/AuthBox.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import useAuthStore from '../Store/AddAuth.ts';
import AddAuth from '../components/AddAuth.tsx';

type RootStackParamList = {
  Home: undefined;
  AddAuth: undefined;
  OtpAuth: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home: FC = () => {
  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation<NavigationProp>();
  const auths = useAuthStore(state => state.auths);
  const [search, setSearch] = React.useState('');

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const goAddPage = () => {
    navigation.navigate('AddAuth');
  };

  return (
    <View style={style.container}>
      <Text style={style.lgText}>{auths.length}</Text>
      <View style={style.mainText}>
        <Icon name={'locked'} size={20} color={'black'} />
        <Text style={style.mainTextText}>Secured Accounts</Text>
      </View>
      <View style={style.center}>
        <TouchableOpacity style={style.subText}>
          <Text style={style.subTextText}>3 Authentication Required</Text>
          <MtIcon name={'fingerprint'} size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={style.flexBox}>
        <View style={style.center}>
          <TouchableOpacity style={style.textInput} onPress={focusInput}>
            <FIcon name={'search'} size={20} color={'gray'} />
            <TextInput
              ref={inputRef}
              style={style.textInputText}
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder={'Search your accounts..'}
              placeholderTextColor={'#989898'}
              numberOfLines={1} // 줄 수를 1로 설정
              multiline={false} // 여러 줄 입력 방지
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={style.settingBox}>
            <Image
              source={require('../assets/edit_.png')}
              style={style.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AuthBox search={search} />
      <AddAuth link={goAddPage} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },

  lgText: {
    marginTop: 20,
    fontSize: 32,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },

  mainText: {
    marginTop: 10,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  mainTextText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Pretendard-Light',
    letterSpacing: 2,
  },

  subText: {
    width: 280,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 22,
    shadowColor: '#000',
    backgroundColor: '#EFEFEF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subTextText: {
    flex: 1,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
  },

  center: {
    marginTop: 20,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },

  textInput: {
    width: 260,
    height: 50,
    paddingHorizontal: 14,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInputText: {
    color: 'black',
    fontSize: 14, // 폰트 크기를 약간 키워줌
    fontFamily: 'Pretendard-Regular',
    marginLeft: 2,
    flex: 1, // 남은 공간을 차지하도록 설정
    textAlignVertical: 'center', // 텍스트 수직 정렬
  },

  image: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 40,
    height: 40,
  },

  flexBox: {
    gap: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },

  settingBox: {
    marginTop: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 16,
  },

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
});

export default Home;
