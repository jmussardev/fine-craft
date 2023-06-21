import { create } from "zustand";

interface item {
  id: string;
  variant: string;
}
// interface seenStore {
//   content: item[];
// }

export const useSeenStore = create((set) => ({
  content: [],
  resumeContent: (local: item[]) => set(() => ({ content: [...local] })),
  //   addItem: (item: item) => {
  //     set((state: seenStore) => ({ content: [...state.content, item] }));
  //   },
  updateContent: (updatedContent: item[]) => {
    set(() => ({ content: [...updatedContent] }));
  },
}));
