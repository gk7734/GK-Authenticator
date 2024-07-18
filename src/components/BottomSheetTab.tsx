import React, {FC, useCallback, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IoIcon from 'react-native-vector-icons/Ionicons';
import MtIcon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import useAuthStore from '../Store/AddAuth.ts';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

interface BottomSheetProps {
  user: string;
  issuer: string;
  secret: string;
  onPositionChange: (position: number) => void;
}

const BottomSheetTab: FC<BottomSheetProps> = ({
  user,
  issuer,
  secret,
  onPositionChange,
}) => {
  const snapPoints = useMemo(() => ['15%', '92%'], []);
  const {otpCodes, removeAuth} = useAuthStore();
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(true);

  const copyToClipboard = async () => {
    try {
      Clipboard.setString(otpCodes[issuer]);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Authenticator',
        text2: '복사 실패하였습니다.',
      });
    }
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      onPositionChange(index);
    },
    [onPositionChange],
  );

  const deleteAuth = () => {
    removeAuth(secret);
    navigation.goBack();
  };

  const onOtpShow = () => {
    if (isShow === true) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{backgroundColor: '#FFFFFF'}}
        onChange={handleSheetChanges}>
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <View style={styles.flex}>
              <Image
                source={{
                  uri: 'https://cdn.brandfetch.io/revolut.com/w/400/h/400',
                }}
                style={styles.brandIcon}
              />
              <Text style={styles.text}>{issuer}</Text>
            </View>
            <TouchableOpacity onPress={deleteAuth}>
              <Icon name={'trash-2'} size={30} color={'#989898'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={styles.card}>
              <View>
                <Text style={styles.boldText}>
                  {isShow ? otpCodes[issuer] : '*****'}
                </Text>
                <Text style={styles.normalText}>{user}</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <TouchableOpacity
                  style={styles.cardBox}
                  onPress={copyToClipboard}>
                  <IoIcon name={'copy-outline'} size={30} color={'#292929'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardBox} onPress={onOtpShow}>
                  <MtIcon name={'visibility-off'} size={30} color={'#292929'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  brandIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DCDCDC',
  },

  boldText: {
    marginTop: 10,
    fontSize: 48,
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 8,
  },

  normalText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#292929',
    fontWeight: '500',
    fontSize: 14,
  },

  card: {
    width: '90%',
    height: 220,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  cardBox: {
    width: 65,
    height: 65,
    borderRadius: 15,
    borderColor: '#EFEFEF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomSheetTab;
