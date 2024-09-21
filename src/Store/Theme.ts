import {create} from 'zustand';

interface ThemeStore {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  darkMode: false,
  setDarkMode: dark => set({darkMode: dark}),
}));
