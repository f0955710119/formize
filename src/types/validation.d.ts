export interface Validation {
  required: boolean;
  length?: number;
  textType?: string[];
  max?: number;
  min?: number;
  decimal?: number;
  unit?: string;
  interval?: number;
  maxSelected?: number;
  maxMartixTitleQuantity?: number;
  multipleDate?: boolean;
  startDate?: string | null;
  endDate?: string | null;
}
