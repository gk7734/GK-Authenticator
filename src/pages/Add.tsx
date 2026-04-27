import React, {FC, useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Vibration, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {parseOtpAuthUrl} from '../Typescript/parseOtpAuthUrl.ts';
import useAuthStore from '../Store/AddAuth.ts';

const Add: FC = () => {
  const [scanned, setScanned] = useState<boolean>(true);
  const ref = useRef(null);
  const {addAuth, auths} = useAuthStore();
  const navigation = useNavigation();
  const urlReg: RegExp =
    /^otpauth:\/\/totp\/([^?]+)\?secret=([A-Z2-7a-z2-7]+)(&issuer=([^&]+))?(&algorithm=(SHA1|SHA256|SHA512))?(&digits=(6|8))?(&period=(\d+))?$/;

  useEffect(() => {
    // 종료 후 재시작을 했을 때 초기화
    setScanned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    if (!scanned) {
      return;
    }
    setScanned(false);
    Vibration.vibrate();

    const scannedCode = event.nativeEvent.codeStringValue;

    const decodedCode = decodeURIComponent(scannedCode);
    console.log(`Decoded code: ${decodedCode}`);

    if (urlReg.test(decodedCode)) {
      const data = parseOtpAuthUrl(decodedCode);
      console.log(auths);
      addAuth(data);
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Authenticator',
        text2: '계정이 추가 됨 👏',
      });
    } else {
      Alert.alert('유효한 QR 코드를 가져오고 다시 시도 하세요.');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.scanner}
        ref={ref}
        cameraType={CameraType.Back}
        scanBarcode
        showFrame={true}
        laserColor="red"
        frameColor="white"
        onReadCode={onBarCodeRead}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scanner: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Add;
