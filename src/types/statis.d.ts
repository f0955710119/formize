export type TextCount = { [key: string]: number | string };
export type NonTextCount = { rowTitle: string; value: string | number };
export type Count = TextCount | NonTextCount[];
export type StatisResponse = {
  id: string;
  title: string;
  type: string;
  count: Count;
  hasAnswerQuantityText: string;
  numericData?: TextCount;
};
