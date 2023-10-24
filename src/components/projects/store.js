import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  projects: [],
  setProjects: (projects) => set({ projects }),
  selectedProject: null,
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  isModal: false,
  isScoreModal: false,
  id: null,
  title: null,
  description: null,
  rate: null,
  selectedStudents: [],

  setIsModal: (isModal) => set({ isModal }),
  setSelectedStudents: (selectedStudents) => set({ selectedStudents }),
  setIsScoreModal: (isScoreModal) => set({ isScoreModal }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setRate: (rate) => set({ rate }),
  setId: (id) => set({ id }),
  reset: () =>
    set({
      id: null,
      title: null,
      description: null,
      rate: null,
    }),
}));
