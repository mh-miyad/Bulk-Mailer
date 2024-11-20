export interface ComponentType {
  type: string;
  props: {
    content?: string;
    src?: string;
    alt?: string;
    label?: string;
    href?: string;
    style?: {
      color?: string;
      backgroundColor?: string;
      fontSize?: string;
      fontWeight?: string;
      textAlign?: "left" | "center" | "right";
      padding?: string;
      margin?: string;
    };
  };
}

export interface HistoryState {
  components: ComponentType[];
}
