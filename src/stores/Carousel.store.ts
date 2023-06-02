import { create } from "zustand";

export const useCarouselStore = create((set) => ({
  isOpen: false,
  index: "",
  setIndex: (index: number) => {
    set(() => ({ index: index }));
  },
  setIsOpen: (boolean: boolean) => {
    set(() => ({ isOpen: boolean }));
  },
}));
