export type StringKeyObject = { [key: string]: number | string };
export type TextCount = StringKeyObject;
export type NonTextCount = { rowTitle: string; value: string | number };
export type Count = TextCount | NonTextCount[];
export type StatisResponse = {
  id: string;
  title: string;
  type: string;
  count: Count;
};
