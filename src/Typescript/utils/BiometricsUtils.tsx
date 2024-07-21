import ReactNativeBiometrics from 'react-native-biometrics';

const reactNativeBiometrics = new ReactNativeBiometrics();

export const checkBiometrics = async () => {
  try {
    const {biometryType} = await reactNativeBiometrics.isSensorAvailable();
    return biometryType;
  } catch (err) {
    return null;
  }
};

export const generateBiometricsPublicKey = async () => {
  try {
    const {keysExist} = await reactNativeBiometrics.biometricKeysExist();
    if (keysExist) {
      throw new Error('Biometrics Key exists.');
    }
    const {publicKey} = await reactNativeBiometrics.createKeys();
    console.log(publicKey, 'Send this to Server');
  } catch (err) {
    return null;
  }
};

export const deleteBiometricsPublicKey = async () => {
  try {
    const {keysDeleted} = await reactNativeBiometrics.deleteKeys();
    if (!keysDeleted) {
      throw new Error('Can not remove biometrics.');
    }
    console.log(keysDeleted);
  } catch (err) {
    console.error(err);
  }
};

export const loginWithBiometrics = async (userId: string) => {
  try {
    const isBiometricAvailable = await checkBiometrics();
    if (!isBiometricAvailable) {
      throw new Error('Biometrics not available.');
    }
    const {keysExist} = await reactNativeBiometrics.biometricKeysExist();

    if (!keysExist) {
      const {publicKey} = await reactNativeBiometrics.createKeys();
      console.log('Public key exists', publicKey);
    }

    const {success, signature} = await reactNativeBiometrics.createSignature({
      promptMessage: '"GK Auth"에 액세스하려면 생채인식 사용하세요.',
      payload: userId,
    });

    if (!success) {
      throw new Error('Biometrics authentication failed!');
    }
    return !!signature;
  } catch (err) {
    return null;
  }
};
