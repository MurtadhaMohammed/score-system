import { create } from "zustand";

export const useActivitiesStore = create((set) => ({
  typeQuery: null,
  setTypeQuery: (typeQuery) => set({ typeQuery }),
  activities: [],
  setActivities: (activities) => set({ activities }),
  isModal: false,
  isImportModal: false,
  isScoreModal: false,
  scoreData: [],
  id: null,
  title: null,
  info: null,
  type: null,
  date: null,
  setIsModal: (isModal) => set({ isModal }),
  setScoreData: (scoreData) => set({ scoreData }),
  setIsImportModal: (isImportModal) => set({ isImportModal }),
  setIsScoreModal: (isScoreModal) => set({ isScoreModal }),
  setTitle: (title) => set({ title }),
  setInfo: (info) => set({ info }),
  setDate: (date) => set({ date }),
  setId: (id) => set({ id }),
  setType: (type) => set({ type }),
  reset: () =>
    set({
      id: null,
      title: null,
      info: null,
      date: null,
      type: null,
    }),
}));
