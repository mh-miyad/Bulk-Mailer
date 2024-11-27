/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ComponentProps, ComponentType } from "@/Type/Types";
import { create } from "zustand";

interface EmailStore {
  components: ComponentType[];
  addComponent: (component: ComponentType) => void;
}
const createDefaultProps = (): ComponentProps => ({
  style: {
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    padding: "0px",
    margin: "0px",
    textAlign: "left",
  },
});

const useNewEmailStore = create<EmailStore>((set) => ({
  components: [],
  addComponent: (component: ComponentType) =>
    set((state) => {
      return {
        components: state.components,
      };
    }),
}));

export default useNewEmailStore;
