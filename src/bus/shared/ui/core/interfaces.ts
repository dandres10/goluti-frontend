import { ReactNode } from "react";

export interface ColumnUI {
  key?: string;
  title?: string;
  align?: unknown;
  width?: string | number;
  fixed?: unknown;
  dataIndex?: string;
  FC?: unknown;
  dataSource?: unknown;
  element?: ReactNode;
}
