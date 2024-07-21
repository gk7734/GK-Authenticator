import {create} from 'zustand';

interface AuthDetailStore {
  user: string;
  issuer: string;
  icon: string;
  setAuthDetail: (user: string, issuer: string, icon: string) => void;
}

export const useAuthDetailStore = create<AuthDetailStore>(set => ({
  user: 'Example',
  issuer: 'user@example.com',
  icon: 'https://cdn.brandfetch.io/revolut.com/w/400/h/400',
  setAuthDetail: (user: string, issuer: string, icon: string) =>
    set({user, issuer, icon}),
}));
