import { create } from "zustand";

export const useAppStore = create((set) => ({
  course: null,
  loading: true,
  setCourse: (course) => set({ course }),
  setLoading: (loading) => set({ loading }),
}));
