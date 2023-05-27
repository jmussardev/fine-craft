import { create } from "zustand";

export const useQuickAddStore = create((set) => ({
  isOpen: false,
  itemId: "",
  setIsOpen: (boolean: boolean) => {
    set((state: any) => ({ isOpen: boolean }));
  },
  setId: (id: string) => {
    set((state: any) => ({ itemId: id }));
  },
}));
