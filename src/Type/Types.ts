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
