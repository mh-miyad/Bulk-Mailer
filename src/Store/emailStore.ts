/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface ComponentType {
  type: string;
  props: Record<string, any>;
}
export interface EmailStore {
  components: ComponentType[];
  selectedComponent: number | null;
  addComponent: (component: ComponentType) => void;
  updateComponent: (index: number, component: ComponentType) => void;
  setSelectedComponent: (index: number | null) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  components: [],
  selectedComponent: null,
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
    })),
  updateComponent: (index, component) =>
    set((state) => ({
      components: state.components.map((c, i) => (i === index ? component : c)),
    })),
  setSelectedComponent: (index) =>
    set(() => ({
      selectedComponent: index,
    })),
}));
