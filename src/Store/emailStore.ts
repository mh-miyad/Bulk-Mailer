/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ComponentProps, ComponentType, HistoryState } from "@/Type/Types";
import { create } from "zustand";

interface EmailStore {
  components: ComponentType[];
  selectedComponent: number | null;
  history: HistoryState[];
  currentHistoryIndex: number;
  addComponent: (component: ComponentType) => void;
  updateComponent: (index: number, component: ComponentType) => void;
  setSelectedComponent: (index: number | null) => void;
  undo: () => void;
  redo: () => void;
  deleteComponent: (index: number) => void;
}

const createDefaultProps = (): ComponentProps => ({
  style: {
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    padding: "16px",
    margin: "0px",
    textAlign: "left",
  },
});

export const useEmailStore = create<EmailStore>((set, get) => ({
  components: [],
  selectedComponent: null,
  history: [{ components: [] }],
  currentHistoryIndex: 0,

  addComponent: (component) =>
    set((state) => {
      const newComponent = {
        ...component,
        props: {
          ...createDefaultProps(),
          ...component.props,
        },
      };
      const newComponents = [...state.components, newComponent];
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1);
      return {
        components: newComponents,
        history: [...newHistory, { components: newComponents }],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };
    }),

  updateComponent: (index, component) =>
    set((state) => {
      const newComponents = state.components.map((c, i) =>
        i === index ? component : c
      );
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1);
      return {
        components: newComponents,
        history: [...newHistory, { components: newComponents }],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };
    }),

  deleteComponent: (index) =>
    set((state) => {
      const newComponents = state.components.filter((_, i) => i !== index);
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1);
      return {
        components: newComponents,
        selectedComponent: null,
        history: [...newHistory, { components: newComponents }],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      };
    }),

  setSelectedComponent: (index) =>
    set(() => ({
      selectedComponent: index,
    })),

  undo: () =>
    set((state) => {
      if (state.currentHistoryIndex > 0) {
        const newIndex = state.currentHistoryIndex - 1;
        return {
          components: state.history[newIndex].components,
          currentHistoryIndex: newIndex,
        };
      }
      return state;
    }),

  redo: () =>
    set((state) => {
      if (state.currentHistoryIndex < state.history.length - 1) {
        const newIndex = state.currentHistoryIndex + 1;
        return {
          components: state.history[newIndex].components,
          currentHistoryIndex: newIndex,
        };
      }
      return state;
    }),
}));
