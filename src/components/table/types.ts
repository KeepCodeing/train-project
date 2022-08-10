export interface TableColumnProp {
  prop?: string;
  label?: string;

  type?: "selection" | "index" | "expand";
  width?: string | number;
  fixed?: true | "left" | "right";
  resizeable?: boolean;
  showOverflowTooltip?: boolean;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";

  // hidden的作用：存一些不展示但可以用来作为当前行的属性使用的数据
  hidden?: boolean;
  slot?: string;
  editable?: boolean;
  editType?: string;
  editAttrs?: any;

  externAction?: Array<Function>;

  render?: Function;
}

export interface PaginationOption {
  small?: boolean;
  disabled?: boolean;
  background?: boolean;
  layout?: string;
  total?: number;
  pageSizes?: number[];

  show?: boolean;
}

export interface TableProp {
  data: any[];

  columnOptions: TableColumnProp[];

  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: "large" | "default" | "small";
  emptyText?: string;
  fit?: boolean;

  showSearch?: boolean;
  showAdd?: boolean;

  paginationOption?: PaginationOption;
}
