import { create } from "zustand";

export const useScoreStore = create((set) => ({
  isModal: false,
  id: null,
  description: null,
  type: null,
  viewType: null, // SCORE || TREND || PROJECT
  activities: null,
  setIsModal: (isModal) => set({ isModal }),
  setDescription: (description) => set({ description }),
  setType: (type) => set({ type }),
  setViewType: (viewType) => set({ viewType }),
  setActivities: (activities) => set({ activities }),

  setId: (id) => set({ id }),
  reset: () =>
    set({
      id: null,
      description: null,
      type: null,
      viewType: null,
      activities: null,
    }),
}));
