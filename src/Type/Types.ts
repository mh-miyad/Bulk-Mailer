export interface ComponentStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  padding?: string;
  margin?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  borderRadius?: string;
  letterSpacing?: string;
  lineHeight?: string;
  textDecoration?: string;
  listStyleType?: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ComponentProps {
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  height?: string;
  leftContent?: string;
  rightContent?: string;
  items?: string[];
  tableData?: TableData;
  style?: ComponentStyle;
}

export interface ComponentType {
  type: string;
  props: ComponentProps;
}

export interface HistoryState {
  components: ComponentType[];
}
export interface Contact {
  id: string;
  name: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  dateAdded: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "scheduled" | "sent";
  sentCount: number;
  openRate: number;
  clickRate: number;
}

export interface DashboardStats {
  totalContacts: number;
  activeContacts: number;
  totalCampaigns: number;
  averageOpenRate: number;
  emailsSent: number;
  openRate: number;
  clickRate: number;
}

export interface DashboardState {
  contacts: Contact[];
  campaigns: Campaign[];
  stats: DashboardStats;
}

export interface DashboardActions {
  setContacts: (contacts: Contact[]) => void;
  setCampaigns: (campaigns: Campaign[]) => void;
  updateStats: () => void;
  fetchDashboardData: () => Promise<void>;
}
