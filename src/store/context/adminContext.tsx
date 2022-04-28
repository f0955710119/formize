import { createContext, useReducer, ReactNode, FC } from "react";
import { Surveys } from "../../types/survey";

interface DriveToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

interface Group {
  id: string;
  name: string;
  surveys: string[];
  userId: string;
}

type SetFieldHandler = (
  fieldKey: string,
  value: string | DriveToken | Group[] | Surveys[]
) => void;

export interface Admin {
  uid: string;
  editingGroupId: string;
  editingSurveyId: string;
  newSurveyId: string;
  driveToken?: DriveToken;
  groups: Group[];
  surveys: Surveys[];
  setField: SetFieldHandler;
}

const initialState: Admin = {
  uid: "",
  editingGroupId: "0",
  editingSurveyId: "",
  newSurveyId: "",
  driveToken: {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expiry_date: 0,
  },
  groups: [],
  surveys: [],
  setField: (fieldKey, value) => {},
};

export const adminContext = createContext(initialState);

interface AdminAction {
  type: string;
  payload: string | DriveToken | Group[] | Surveys[];
}

interface AdminReducerState {
  uid: string;
  editingGroupId: string;
  editingSurveyId: string;
  newSurveyId: string;
  driveToken?: DriveToken;
  groups: Group[];
  surveys: Surveys[];
}

const adminReducer = (state: AdminReducerState, action: AdminAction) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const initAdminReducerState = {
  uid: "",
  editingGroupId: "0",
  editingSurveyId: "",
  newSurveyId: "",
  driveToken: {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expiry_date: 0,
  },
  groups: [],
  surveys: [],
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [adminInfo, dispatch] = useReducer(adminReducer, initAdminReducerState);
  const setFieldHandler: SetFieldHandler = (fieldKey, value) => {
    console.log(value);
    dispatch({ type: fieldKey, payload: value });
  };
  const adminDefaultContext = {
    uid: adminInfo.uid,
    editingGroupId: adminInfo.editingGroupId,
    editingSurveyId: adminInfo.editingSurveyId,
    newSurveyId: adminInfo.newSurveyId,
    driveToken: adminInfo.driveToken,
    groups: adminInfo.groups,
    surveys: adminInfo.surveys,
    setField: setFieldHandler,
  };
  return (
    <adminContext.Provider value={adminDefaultContext}>
      {children}
    </adminContext.Provider>
  );
};
