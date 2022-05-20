export interface Settings {
  title: string;
  mode: string;
  startPageImageFile: string | null;
  startPageParagraph: string;
  endPageImageFile: string | null;
  endPageParagraph: string;
  pageQuantity: number;
}

export type SetFieldHandler = (
  fieldKey: string,
  value: File | string | null | number
) => void;

export interface SettingContext {
  title: string;
  mode: string;
  pageQuantity: number;
  startPageImageFile: File | null;
  startPageImageObjectUrl: string | null;
  endPageImageFile: File | null;
  endPageImageObjectUrl: string | null;
  setField: SetFieldHandler;
}
