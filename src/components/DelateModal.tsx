import React, {useEffect, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useModalStore} from '../Store/Modal.ts';
import AuthCard from './AuthCard.tsx';
import CardBtn from './CardBtn.tsx';
import {
  checkBiometrics,
  loginWithBiometrics,
} from '../Typescript/utils/BiometricsUtils.tsx';
import {BiometryTypes} from 'react-native-biometrics';
import useAuthStore from '../Store/AddAuth.ts';
import {useAuthDetailStore} from '../Store/AuthDetail.ts';
import {useNavigation} from '@react-navigation/native';

const DeleteModal = () => {
  const {isOpen, setIsOpen} = useModalStore();
  const removeAuth = useAuthStore(state => state.removeAuth);
  const secret = useAuthDetailStore(state => state.secret);
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateListener.remove();
    };
  });

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      onAppReturn();
    }
  };

  const onAppReturn = () => {
    setIsOpen(false);
  };

  const authenticateBiometrics = async (): Promise<boolean> => {
    const biometryType = await checkBiometrics();
    if (biometryType === BiometryTypes.Biometrics) {
      const userId = 'OtpAuthUser';
      const result = await loginWithBiometrics(userId);

      if (result) {
        console.log('Biometric authentication successful');
        setBiometricAuthenticated(true);
        return true;
      } else {
        console.log('Biometric authentication failed');
        setBiometricAuthenticated(false);
        return false;
      }
    } else {
      setBiometricAuthenticated(false);
      return false;
    }
  };

  const deleteHandler = async () => {
    if (!biometricAuthenticated) {
      const success = await authenticateBiometrics();
      if (success) {
        removeAuth(secret);
        setIsOpen(false);
        navigation.goBack();
      }
    } else {
      removeAuth(secret);
      navigation.goBack();
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        setIsOpen(false);
      }}>
      <Pressable style={styles.center} onPress={() => setIsOpen(false)}>
        <View style={styles.modalContainer}>
          <Pressable onPress={e => e.stopPropagation()}>
            <View>
              <Text style={styles.modalTitle}>Delete Auth</Text>
              <Text style={styles.modalDescription}>
                Are you sure you want to delete the{' '}
                <Text style={{fontFamily: 'Pretendard-Medium'}}>Account?</Text>
              </Text>
            </View>
            <AuthCard />
            <View style={{marginTop: 5}}>
              <CardBtn
                title={'Delete'}
                press={deleteHandler}
                color={'#FE043F'}
                borderColor={'none'}
                borderWidth={0}
                textColor={'white'}
              />
              <CardBtn
                title={'Cancel'}
                press={() => setIsOpen(false)}
                color={'white'}
                borderColor={'#BDBDBD'}
                borderWidth={1}
                textColor={'black'}
              />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // 검은 배경과 투명도 설정
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    height: 320,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
  },

  modalTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-SemiBold',
    color: 'black',
  },

  modalDescription: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Pretendard-Light',
    color: 'black',
  },

  authCard: {},
});

export default DeleteModal;
