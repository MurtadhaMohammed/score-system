import { create } from "zustand";

export const useScoreStore = create((set) => ({
  isModal: false,
  id: null,
  description: null,
  type: null,
  activity: null,
  setIsModal: (isModal) => set({ isModal }),
  setDescription: (description) => set({ description }),
  setType: (type) => set({ type }),
  setActivity: (activity) => set({ activity }),

  setId: (id) => set({ id }),
  reset: () =>
    set({
      id: null,
      description: null,
      type: null,
      activity: null,
    }),
  scores: [],
  setScores: (scores) => set({ scores }),
}));
