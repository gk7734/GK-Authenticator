import {create} from 'zustand';

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}

export const useModalStore = create<ModalStore>(set => ({
  isOpen: false,
  setIsOpen: (bool: boolean) => set({isOpen: bool}),
}));
