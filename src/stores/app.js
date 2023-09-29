import { create } from "zustand";

export const useAppStore = create((set) => ({
  course: null,
  loading: true,
  courses: [],
  setCourse: (course) => set({ course }),
  setCourses: (courses) => set({ courses }),
  setLoading: (loading) => set({ loading }),
}));
