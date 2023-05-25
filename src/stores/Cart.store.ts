import { create } from "zustand";

interface content {
  id: string;
  variant?: string;
  type?: string;
}
interface item {
  content: content;
  quantity: number;
}
interface cartStore {
  content: item[];
}

export const useCartStore = create((set) => ({
  content: [],
  resumeContent: (local: item[]) => set(() => ({ content: [...local] })),
  addItem: (item: item) => {
    set((state: cartStore) => ({ content: [...state.content, item] }));
  },
  updateContent: (updatedContent: item[]) => {
    set(() => ({ content: [...updatedContent] }));
  },
  // removeItem: (item:item) => set((state:cartStore) => ( { content: [...state.content, item] }))
}));
