import { create } from "zustand";

export const useQuickAddStore = create((set) => ({
  isOpen: false,
  itemId: "",
  isLoading: false,
  isValided: false,
  current: "",
  setIsOpen: (boolean: boolean) => {
    set(() => ({ isOpen: boolean }));
  },
  setId: (id: string) => {
    set(() => ({ itemId: id }));
  },
  setCurrent: (variant: any) => {
    set(() => ({ current: variant }));
  },
}));
