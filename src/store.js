import { create } from "zustand";
export const useKeywordStore = create((set) => ({
  keyword: "",
  setKeyword: (keyword) => {
    set({ keyword });
  },
}));
