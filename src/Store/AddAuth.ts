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
  isLoading: boolean;
  addAuth: (auth: Auth) => void;
  removeAuth: (secret: string) => void;
  generateOTP: () => void;
  setTimeRemaining: (time: number) => void;
  setSelectedAccount: (auth: Auth | null) => void;
}

type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>,
) => StateCreator<AuthStore>;

const useAuthStore = create<AuthStore>(
  (persist as MyPersist)(
    (set, get) => ({
      auths: [],
      otpCodes: {},
      timeRemaining: 30,
      selectedAccount: null,
      isLoading: true,
      addAuth: auth =>
        set(state => ({
          auths: [...state.auths, auth],
        })),
      removeAuth: secret =>
        set(state => ({
          auths: state.auths.filter(auth => auth.secret !== secret),
        })),
      generateOTP: async () => {
        set({isLoading: true});
        const newOtpCodes: {[key: string]: string} = {};
        const auths = get().auths;
        for (const auth of auths) {
          const token = authenticator.generate(auth.secret);
          newOtpCodes[auth.issuer] = token;
        }
        set({otpCodes: newOtpCodes, isLoading: false});
      },
      setTimeRemaining: time => set({timeRemaining: time}),
      setSelectedAccount: auth => set({selectedAccount: auth}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
