// import { create } from "zustand";

// interface Template {
//   templateName: string;
//   templateId: string;
//   createdDate: string;
//   html: string;
//   json?: object;
// }

// interface StoreOFSate {
//   breadcrumbs: string;
//   htmlArray: Template[];
//   addHtml: (template: Template) => void;
//   setBreadcrumbs: (breadcrumbs: string) => void;
//   deleteHtml: (index: number) => void;
//   clearHtmlArray: () => void;
// }

// // Load initial HTML array from localStorage
// const getInitialHtmlArray = (): Template[] => {
//   if (typeof window !== "undefined") {
//     const savedHtml = window.localStorage.getItem("htmlArray");
//     return savedHtml ? JSON.parse(savedHtml) : [];
//   }
//   return []; // Return an empty array for the server side
// };
// const useStore = create<StoreOFSate>((set) => ({
//   breadcrumbs: "",
//   htmlArray: getInitialHtmlArray(),

//   addHtml: (template: Template) =>
//     set((state) => {
//       const updatedArray = [...state.htmlArray, template];
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
//       localStorage.removeItem("htmlArray");
//       return { htmlArray: [] };
//     }),
// }));

// export default useStore;
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Template {
  templateName: string;
  templateId: string;
  createdDate: string;
  html: string;
  json?: object;
}

interface StoreOfState {
  breadcrumbs: string;
  htmlArray: Template[];
  addHtml: (template: Template) => void;
  updateHtml: (template: Template) => void;
  setBreadcrumbs: (breadcrumbs: string) => void;
  deleteHtml: (index: number) => void;
  clearHtmlArray: () => void;
}

const useStore = create<StoreOfState>()(
  persist(
    (set) => ({
      breadcrumbs: "",
      htmlArray: [],

      addHtml: (template) =>
        set((state) => {
          const updatedArray = [...state.htmlArray, template];
          return { htmlArray: updatedArray };
        }),

      updateHtml: (template) =>
        set((state) => {
          const updatedArray = state.htmlArray.map((item) =>
            item.templateId === template.templateId ? template : item
          );
          return { htmlArray: updatedArray };
        }),

      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

      deleteHtml: (index) =>
        set((state) => {
          const updatedArray = state.htmlArray.filter((_, i) => i !== index);
          return { htmlArray: updatedArray };
        }),

      clearHtmlArray: () => set(() => ({ htmlArray: [] })),
    }),
    {
      name: "email-template-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useStore;
