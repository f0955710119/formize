import { createContext, useReducer, ReactNode, FC } from "react";
import { Forms } from "../../types/form";

interface DriveToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export interface Group {
  id: string;
  name: string;
  forms: string[];
  userId: string;
}

type SetFieldHandler = (
  fieldKey: string,
  value: string | DriveToken | Group[] | Forms[] | number
) => void;

export interface Admin {
  uid: string;
  editingGroupId: string;
  editingFormId: string;
  newFormId: string;
  driveToken?: DriveToken;
  groups: Group[];
  forms: Forms[];
  currentAnalysisPage: number;
  setField: SetFieldHandler;
}

const initialState: Admin = {
  uid: "",
  editingGroupId: "0",
  editingFormId: "",
  newFormId: "",
  driveToken: {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expiry_date: 0,
  },
  currentAnalysisPage: 0,
  groups: [],
  forms: [],
  setField: (fieldKey, value) => {},
};

export const adminContext = createContext(initialState);

interface AdminAction {
  type: string;
  payload: string | DriveToken | Group[] | Forms[] | number;
}

interface AdminReducerState {
  uid: string;
  editingGroupId: string;
  editingFormId: string;
  newFormId: string;
  driveToken?: DriveToken;
  currentAnalysisPage: number;
  groups: Group[];
  forms: Forms[];
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
  editingFormId: "",
  newFormId: "",
  driveToken: {
    access_token: "",
    refresh_token: "",
    scope: "",
    token_type: "",
    expiry_date: 0,
  },
  currentAnalysisPage: 0,
  groups: [],
  forms: [],
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [adminInfo, dispatch] = useReducer(adminReducer, initAdminReducerState);
  const setFieldHandler: SetFieldHandler = (fieldKey, value) => {
    dispatch({ type: fieldKey, payload: value });
  };
  const adminDefaultContext = {
    uid: adminInfo.uid,
    editingGroupId: adminInfo.editingGroupId,
    editingFormId: adminInfo.editingFormId,
    newFormId: adminInfo.newFormId,
    driveToken: adminInfo.driveToken,
    currentAnalysisPage: adminInfo.currentAnalysisPage,
    groups: adminInfo.groups,
    forms: adminInfo.forms,
    setField: setFieldHandler,
  };
  return (
    <adminContext.Provider value={adminDefaultContext}>
      {children}
    </adminContext.Provider>
  );
};
