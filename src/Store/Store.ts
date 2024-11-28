import { create } from "zustand";

interface Template {
  templateName: string;
  templateId: string;
  createdDate: string;
  html: string;
  json?: object;
}

interface StoreOFSate {
  breadcrumbs: string;
  htmlArray: Template[];
  addHtml: (template: Template) => void;
  setBreadcrumbs: (breadcrumbs: string) => void;
  deleteHtml: (index: number) => void;
  clearHtmlArray: () => void;
}

// Load initial HTML array from localStorage
const getInitialHtmlArray = (): Template[] => {
  if (typeof window !== "undefined") {
    const savedHtml = window.localStorage.getItem("htmlArray");
    return savedHtml ? JSON.parse(savedHtml) : [];
  }
  return []; // Return an empty array for the server side
};
const useStore = create<StoreOFSate>((set) => ({
  breadcrumbs: "",
  htmlArray: getInitialHtmlArray(),

  addHtml: (template: Template) =>
    set((state) => {
      const updatedArray = [...state.htmlArray, template];
      localStorage.setItem("htmlArray", JSON.stringify(updatedArray));
      return { htmlArray: updatedArray };
    }),

  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

  deleteHtml: (index: number) =>
    set((state) => {
      const updatedArray = state.htmlArray.filter((_, i) => i !== index);
      localStorage.setItem("htmlArray", JSON.stringify(updatedArray));
      return { htmlArray: updatedArray };
    }),

  clearHtmlArray: () =>
    set(() => {
      localStorage.removeItem("htmlArray");
      return { htmlArray: [] };
    }),
}));

export default useStore;
