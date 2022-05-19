export interface TableInfoItem {
  type: string;
  id: string;
  title: string;
  options?: string[];
  matrixs?: string[];
}

export type TableCounts =
  | { [key: string]: number }
  | { [key: string]: string }
  | { [key: string]: string | number }[];

export type ExtraNumericData = {
  [x: string]: {
    [key: string]: number;
  };
}[];

export interface GeneralTableInfo {
  data: [string | null];
  tableIndex: number;
  responsedTimesOfDiffernetAnswers: number[];
}
export interface OptionTableInfo extends GeneralTableInfo {
  options: string[] | undefined;
}
export interface MatrixTableInfo extends GeneralTableInfo {
  matrixs: string[] | undefined;
}
