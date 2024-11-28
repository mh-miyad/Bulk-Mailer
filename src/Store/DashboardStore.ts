/* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";

// interface Contact {
//   id: string;
//   name: string;
//   email: string;
//   status: string;
// }

// interface Campaign {
//   id: string;
//   name: string;
//   status: string;
//   sentCount: number;
//   openRate: number;
//   clickRate: number;
// }

// interface DashboardState {
//   contacts: Contact[];
//   campaigns: Campaign[];
//   emailsSent: number;
//   openRate: number;
//   clickRate: number;
//   stats: {
//     totalContacts: number;
//     activeContacts: number;
//     totalCampaigns: number;
//     averageOpenRate: number;
//   };
//   updateStats: () => void;
//   fetchDashboardData: () => Promise<void>;
// }

// export const useDashboardStore = create<DashboardState>((set) => ({
//   contacts: [],
//   campaigns: [],
//   emailsSent: 0,
//   openRate: 0,
//   clickRate: 0,
//   stats: {
//     totalContacts: 0,
//     activeContacts: 0,
//     totalCampaigns: 0,
//     averageOpenRate: 0,
//   },
//   fetchDashboardData: async () => {
//     // Simulating API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     set({
//       contacts: [
//         {
//           id: "1",
//           name: "John Doe",
//           email: "john@example.com",
//           status: "Subscribed",
//         },
//         {
//           id: "2",
//           name: "Jane Smith",
//           email: "jane@example.com",
//           status: "Unsubscribed",
//         },
//         // Add more mock contacts...
//       ],
//       campaigns: [
//         {
//           id: "1",
//           name: "Summer Sale",
//           status: "Sent",
//           sentCount: 1000,
//           openRate: 25,
//           clickRate: 10,
//         },
//         {
//           id: "2",
//           name: "Newsletter",
//           status: "Draft",
//           sentCount: 0,
//           openRate: 0,
//           clickRate: 0,
//         },
//         // Add more mock campaigns...
//       ],
//       emailsSent: 10000,
//       openRate: 22,
//       clickRate: 3.5,
//     });
//   },
//   updateStats: () => {
//     const { contacts, campaigns } = get();
//     set({
//       stats: {
//         totalContacts: contacts.length,
//         activeContacts: contacts.filter((c) => c.status === "subscribed")
//           .length,
//         totalCampaigns: campaigns.length,
//         averageOpenRate:
//           campaigns.reduce((acc, curr) => acc + curr.openRate, 0) /
//           campaigns.length,
//       },
//     });
//   },
// }));

import {
  Campaign,
  Contact,
  DashboardActions,
  DashboardState,
} from "@/Type/Types";
import { create } from "zustand";

type Store = DashboardState & DashboardActions;

const calculateStats = (contacts: Contact[], campaigns: Campaign[]) => ({
  totalContacts: contacts.length,
  activeContacts: contacts.filter((c) => c.status === "subscribed").length,
  totalCampaigns: campaigns.length,
  averageOpenRate: campaigns.length
    ? campaigns.reduce((acc: number, curr) => acc + curr.openRate, 0) /
      campaigns.length
    : 0,
  emailsSent: campaigns.reduce(
    (acc: number, curr) => acc + (curr.sentCount || 0),
    0
  ),
  openRate: campaigns.length
    ? campaigns.reduce((acc: number, curr) => acc + curr.openRate, 0) /
      campaigns.length
    : 0,
  clickRate: campaigns.length
    ? campaigns.reduce((acc: number, curr) => acc + curr.clickRate, 0) /
      campaigns.length
    : 0,
});

export const useDashboardStore = create<Store>((set, get) => ({
  contacts: [],
  campaigns: [],
  stats: {
    totalContacts: 0,
    activeContacts: 0,
    totalCampaigns: 0,
    averageOpenRate: 0,
    emailsSent: 0,
    openRate: 0,
    clickRate: 0,
  },
  setContacts: (contacts) => {
    set({ contacts });
    get().updateStats();
  },
  setCampaigns: (campaigns) => {
    set({ campaigns });
    get().updateStats();
  },
  updateStats: () => {
    const { contacts, campaigns } = get();
    set({ stats: calculateStats(contacts, campaigns) });
  },
  fetchDashboardData: async () => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockContacts: Contact[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        status: "subscribed",
        dateAdded: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        status: "unsubscribed",
        dateAdded: new Date().toISOString(),
      },
    ];

    const mockCampaigns: Campaign[] = [
      {
        id: "1",
        name: "Summer Sale",
        status: "sent",
        sentCount: 1000,
        openRate: 25,
        clickRate: 10,
      },
      {
        id: "2",
        name: "Newsletter",
        status: "draft",
        sentCount: 0,
        openRate: 0,
        clickRate: 0,
      },
    ];

    set({
      contacts: mockContacts,
      campaigns: mockCampaigns,
    });
    get().updateStats();
  },
}));
