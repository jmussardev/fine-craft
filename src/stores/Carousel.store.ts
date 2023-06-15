import { create } from "zustand";

export const useCarouselStore = create((set) => ({
  isOpen: false,
  index: 0,
  isZooming: false,
  setIndex: (index: number) => {
    set(() => ({ index: index }));
  },
  setIsOpen: (boolean: boolean) => {
    set(() => ({ isOpen: boolean }));
  },
  setIsZooming: (boolean: boolean) => {
    set(() => ({ isZooming: boolean }));
  },
}));
