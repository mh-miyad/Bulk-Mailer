import { create } from "zustand";

interface StoreOFSate {
  breadcrumbs: string;
  setBreadcrumbs: (breadcrumbs: string) => void;
}

const useStore = create<StoreOFSate>((set) => ({
  breadcrumbs: "",
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));

export default useStore;
