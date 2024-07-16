import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Auth 인터페이스 정의
interface Auth {
  user: string;
  secret: string;
  issuer: string;
}

// AuthStore 인터페이스 정의
interface AuthStore {
  auths: Auth[];
  addAuth: (auth: Auth) => void;
  removeAuth: (secret: string) => void;
}

// Persist 미들웨어 옵션 타입 정의
type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>,
) => StateCreator<AuthStore>;

// zustand 스토어 생성
const useAuthStore = create<AuthStore>(
  (persist as MyPersist)(
    set => ({
      auths: [],
      addAuth: auth =>
        set(state => ({
          auths: [...state.auths, auth],
        })),
      removeAuth: secret =>
        set(state => ({
          auths: state.auths.filter(auth => auth.secret !== secret),
        })),
    }),
    {
      name: 'auth-storage', // storage에 저장될 아이템의 이름
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
