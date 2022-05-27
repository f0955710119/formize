export type SetFieldHandler = (fieldKey: string, value: string) => void;

export interface StyleContext {
  theme: string;
  font: string;
  backgroundImage: string;
  setField: SetFieldHandler;
}

export interface Style {
  theme: string;
  font: string;
  backgroundImage: string;
}
