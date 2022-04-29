type FormId = string;
export interface Group {
  name: string;
  forms: FormId[];
}
export interface Users {
  id: string;
  groups: Group[];
}
