import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authenticator} from 'otplib';

interface Auth {
  user: string;
  secret: string;
  issuer: string;
}

interface AuthStore {
  auths: Auth[];
  otpCodes: {[key: string]: string};
  timeRemaining: number;
  selectedAccount: Auth | null;
  bottomSheetPosition: number;
  addAuth: (auth: Auth) => void;
  removeAuth: (secret: string) => void;
  generateOTP: () => void;
  setTimeRemaining: (time: number) => void;
  setSelectedAccount: (auth: Auth | null) => void;
  setBottomSheetPosition: (position: number) => void;
}

type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>,
) => StateCreator<AuthStore>;

const useAuthStore = create<AuthStore>(
  (persist as MyPersist)(
    set => ({
      auths: [],
      otpCodes: {},
      timeRemaining: 30,
      selectedAccount: null,
      bottomSheetPosition: -1,
      addAuth: auth =>
        set(state => ({
          auths: [...state.auths, auth],
        })),
      removeAuth: secret =>
        set(state => ({
          auths: state.auths.filter(auth => auth.secret !== secret),
        })),
      generateOTP: () =>
        set(state => {
          const newOtpCodes: {[key: string]: string} = {};
          state.auths.forEach(auth => {
            const token = authenticator.generate(auth.secret);
            newOtpCodes[auth.issuer] = token;
          });
          return {otpCodes: newOtpCodes};
        }),
      setTimeRemaining: time => set({timeRemaining: time}),
      setSelectedAccount: auth => set({selectedAccount: auth}),
      setBottomSheetPosition: position => set({bottomSheetPosition: position}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
