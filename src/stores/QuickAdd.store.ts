import { create } from "zustand";

export const useQuickAddStore = create((set) => ({
  isOpen: false,
  itemId: "",
  toggleQuickAddDrawer: () => {
    set((state: any) => ({ isOpen: !state.isOpen }));
  },
  setId: (id: string) => {
    set((state: any) => ({ itemId: id }));
  },
}));
