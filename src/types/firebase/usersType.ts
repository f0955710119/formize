type SurveyId = string;
export interface Group {
  name: string;
  surveys: SurveyId[];
}
export interface Users {
  id: string;
  groups: Group[];
}
