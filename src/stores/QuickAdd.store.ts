import { create } from "zustand";

export const useQuickAddStore = create((set) => ({
  isOpen: false,
  itemId: "",
  isLoading: false,
  isValided: false,
  current: "",
  setIsOpen: (boolean: boolean) => {
    set((state: any) => ({ isOpen: boolean }));
  },
  setId: (id: string) => {
    set((state: any) => ({ itemId: id }));
  },
  setCurrent: (variant: any) => {
    set((state: any) => ({ current: variant }));
  },
}));
