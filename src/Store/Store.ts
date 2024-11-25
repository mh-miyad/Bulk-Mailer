// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";

// interface StoreOFSate {
//   breadcrumbs: string;
//   htmlArray: string[];
//   addHtml: (html: string) => void;
//   setBreadcrumbs: (breadcrumbs: string) => void;
//   deleteHtml: (index: number) => void;
//   clearHtmlArray: () => void;
// }
// const getInitialHtmlArray = (): string[] => {
//   const savedHtml = localStorage.getItem("htmlArray");
//   return savedHtml ? JSON.parse(savedHtml) : [];
// };

// const useStore = create<StoreOFSate>((set) => ({
//   breadcrumbs: "",
//   htmlArray: getInitialHtmlArray(),
//   addHtml: (html: string) =>
//     set((state) => {
//       const updatedArray = [...state.htmlArray, html];
//       localStorage.setItem("htmlArray", JSON.stringify(updatedArray));
//       return { htmlArray: updatedArray };
//     }),
//   setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
//   deleteHtml: (index: number) =>
//     set((state) => {
//       const updatedArray = state.htmlArray.filter((_, i) => i !== index);
//       localStorage.setItem("htmlArray", JSON.stringify(updatedArray));
//       return { htmlArray: updatedArray };
//     }),

//   clearHtmlArray: () =>
//     set(() => {
//       localStorage.removeItem("htmlArray"); // Clear localStorage
//       return { htmlArray: [] };
//     }),
// }));

// export default useStore;
// store.ts
import { create } from "zustand";

interface Template {
  templateName: string;
  templateId: string;
  createdDate: string;
  html: string;
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
  const savedHtml = localStorage.getItem("htmlArray");
  return savedHtml ? JSON.parse(savedHtml) : [];
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
