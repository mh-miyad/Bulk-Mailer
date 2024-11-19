/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
interface EmailTemplate {
  design: any[];
  templates: any[];
  history: any[][];
  historyIndex: number;
  selectedComponent: any;
  setDesign: (newDesign: any[]) => void;
  setSelectedComponent: (component: any) => void;
  updateComponent: (id: any, updates: any) => void;
  addTemplate: (template: any) => void;
  undo: () => void;
  redo: () => void;
}
const useStore = create<EmailTemplate>((set) => ({
  design: [],
  templates: [],
  history: [[]],
  historyIndex: 0,
  selectedComponent: null,
  setDesign: (newDesign) =>
    set((state) => {
      const newHistory = [
        ...state.history.slice(0, state.historyIndex + 1),
        newDesign,
      ];
      return {
        design: newDesign,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }),
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  updateComponent: (id, updates) =>
    set((state) => {
      const newDesign = state.design.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      const newHistory = [
        ...state.history.slice(0, state.historyIndex + 1),
        newDesign,
      ];
      return {
        design: newDesign,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        selectedComponent:
          newDesign.find((item) => item.id === id) || state.selectedComponent,
      };
    }),
  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
    })),
  undo: () =>
    set((state) => {
      if (state.historyIndex > 0) {
        const newDesign = state.history[state.historyIndex - 1];
        return {
          design: newDesign,
          historyIndex: state.historyIndex - 1,
          selectedComponent: state.selectedComponent
            ? newDesign.find(
                (item) => item.id === state.selectedComponent.id
              ) || null
            : null,
        };
      }
      return state;
    }),
  redo: () =>
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newDesign = state.history[state.historyIndex + 1];
        return {
          design: newDesign,
          historyIndex: state.historyIndex + 1,
          selectedComponent: state.selectedComponent
            ? newDesign.find(
                (item) => item.id === state.selectedComponent.id
              ) || null
            : null,
        };
      }
      return state;
    }),
}));

export default useStore;
