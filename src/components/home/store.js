import { create } from "zustand";

export const useStudentStore = create((set) => ({
  isModal: false,
  id: null,
  name: null,
  birthDate: null,
  img: null,
  phone: null,
  email: null,
  setIsModal: (isModal) => set({ isModal }),
  setName: (name) => set({ name }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setImg: (img) => set({ img }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setId: (id) => set({ id }),
  reset: () =>
    set({
      name: null,
      birthDate: null,
      img: null,
      phone: null,
      email: null,
      id: null,
    }),
}));
