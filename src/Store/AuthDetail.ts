import {create} from 'zustand';

interface AuthDetailStore {
  user: string;
  issuer: string;
  icon: string;
  secret: string;
  setAuthDetail: (
    user: string,
    issuer: string,
    icon: string,
    secret: string,
  ) => void;
}

export const useAuthDetailStore = create<AuthDetailStore>(set => ({
  user: 'Example',
  issuer: 'user@example.com',
  icon: 'https://cdn.brandfetch.io/revolut.com/w/400/h/400',
  secret: '',
  setAuthDetail: (user: string, issuer: string, icon: string, secret: string) =>
    set({user, issuer, icon, secret}),
}));
