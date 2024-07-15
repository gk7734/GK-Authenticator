import {create} from 'zustand';

// Auth 인터페이스 정의
interface Auth {
  user: string;
  secret: string;
  issuer?: string;
}

// AuthStore 인터페이스 정의
interface AuthStore {
  auths: Auth[];
  addAuth: (auth: Auth) => void;
  removeAuth: (secret: string) => void;
}

// zustand 스토어 생성
const useAuthStore = create<AuthStore>(set => ({
  auths: [],
  addAuth: (auth: Auth) =>
    set(state => ({
      auths: [...state.auths, auth],
    })),
  removeAuth: (secret: string) =>
    set(state => ({
      auths: state.auths.filter(auth => auth.secret !== secret),
    })),
}));

export default useAuthStore;
