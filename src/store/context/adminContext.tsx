import { createContext, useReducer, ReactNode, FC } from "react";

import type { Forms } from "../../types/form";
import type { Group } from "../../types/group";

type SetFieldHandler = (
  fieldKey: string,
  value: string | Group[] | Forms[] | number
) => void;

export interface Admin {
  uid: string;
  editingGroupId: string;
  editingFormId: string;
  newFormId: string;
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
  currentAnalysisPage: 0,
  groups: [],
  forms: [],
  setField: (fieldKey, value) => {},
};

export const adminContext = createContext(initialState);

interface AdminAction {
  type: string;
  payload: string | Group[] | Forms[] | number;
}

interface AdminReducerState {
  uid: string;
  editingGroupId: string;
  editingFormId: string;
  newFormId: string;
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
