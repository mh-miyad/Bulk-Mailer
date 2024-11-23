import { create } from "zustand";

interface Contact {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
}

interface DashboardState {
  contacts: Contact[];
  campaigns: Campaign[];
  emailsSent: number;
  openRate: number;
  clickRate: number;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  contacts: [],
  campaigns: [],
  emailsSent: 0,
  openRate: 0,
  clickRate: 0,
  fetchDashboardData: async () => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      contacts: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          status: "Subscribed",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          status: "Unsubscribed",
        },
        // Add more mock contacts...
      ],
      campaigns: [
        {
          id: "1",
          name: "Summer Sale",
          status: "Sent",
          sentCount: 1000,
          openRate: 25,
          clickRate: 10,
        },
        {
          id: "2",
          name: "Newsletter",
          status: "Draft",
          sentCount: 0,
          openRate: 0,
          clickRate: 0,
        },
        // Add more mock campaigns...
      ],
      emailsSent: 10000,
      openRate: 22,
      clickRate: 3.5,
    });
  },
}));
